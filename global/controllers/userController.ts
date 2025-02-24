import User from "@global/models/User";
import AdminAction from "@global/models/AdminAction";
import { CustomError } from "@global/utils/errors";

export async function getAllUsers() {
  const users = await User.find().select("-password");
  if (!users || users.length === 0) {
    throw new CustomError("No users found", 404);
  }
  return users;
}

export async function getUserById(id: string) {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  return user;
}

export async function deleteUser(data: { userId: string; adminId: string }) {
  const { userId, adminId } = data;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  await user.deleteOne();

  const adminAction = new AdminAction({
    admin: adminId,
    action: "Deleted User",
    targetId: user._id,
    targetType: "user",
    description: `User "${user.name}" was deleted by admin.`,
    performedAt: new Date(),
  });
  await adminAction.save();

  return { message: "User deleted successfully" };
}

export async function suspendUser(data: {
  email: string;
  suspensionDuration: number;
  adminId: string;
}) {
  const { email, suspensionDuration, adminId } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  if (user.isBanned) {
    throw new CustomError("User is banned and cannot be suspended", 400);
  }

  const suspensionEndDate = new Date();
  suspensionEndDate.setDate(suspensionEndDate.getDate() + suspensionDuration);

  user.isSuspended = true;
  user.suspensionEndDate = suspensionEndDate;
  await user.save();

  const adminAction = new AdminAction({
    admin: adminId,
    action: "Suspended User",
    targetId: user._id,
    targetType: "user",
    description: `User "${user.name}" was suspended for ${suspensionDuration} days by admin.`,
    performedAt: new Date(),
  });
  await adminAction.save();

  return {
    message: `User "${user.name}" has been suspended for ${suspensionDuration} days`,
    user,
  };
}

export async function banUser(data: {
  email: string;
  adminId: string;
  adminName: string;
}) {
  const { email, adminId, adminName } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  user.isBanned = true;
  user.isSuspended = false;
  user.suspensionEndDate = null;
  await user.save();

  const adminAction = new AdminAction({
    admin: adminId,
    action: "Banned User",
    targetId: user._id,
    targetType: "user",
    description: `User "${user.name}" was permanently banned by admin "${adminName}".`,
    performedAt: new Date(),
  });
  await adminAction.save();

  return {
    message: `User "${user.name}" has been permanently banned`,
    user,
  };
}

export async function reviveUser(data: {
  email: string;
  adminId: string;
  adminName: string;
}) {
  const { email, adminId, adminName } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  if (!user.isSuspended && !user.isBanned) {
    throw new CustomError("User is not suspended or banned", 400);
  }

  user.isSuspended = false;
  user.suspensionEndDate = null;
  user.isBanned = false;
  await user.save();

  const adminAction = new AdminAction({
    admin: adminId,
    action: "Revived User",
    targetId: user._id,
    targetType: "user",
    description: `User "${user.name}" was revived (suspension or ban removed) by admin "${adminName}".`,
    performedAt: new Date(),
  });
  await adminAction.save();

  return {
    message: `User "${user.name}" has been revived (suspension/ban removed)`,
    user,
  };
}
