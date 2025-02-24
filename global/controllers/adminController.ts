import { Response, RequestHandler } from "express";
import { AuthenticatedRequest } from "../middleware/authenticateToken";
import AdminAction from "../models/AdminAction";
import User from "../models/User";

type AuthenticatedRequestHandler = RequestHandler<
  any,
  any,
  any,
  any,
  AuthenticatedRequest
>;

// Add new function for Next.js routes
export async function createAdminAction(data: {
  userId: string;
  action: string;
  targetId: string;
  targetType: string;
  description: string;
}) {
  const adminAction = new AdminAction({
    admin: data.userId,
    action: data.action,
    targetId: data.targetId,
    targetType: data.targetType,
    description: data.description,
    performedAt: new Date(),
  });
  return await adminAction.save();
}

// Add new function for Next.js routes
export async function getAdminActionsData() {
  return await AdminAction.find().populate("admin", "name email");
}

// Controller to log an admin action
export const createAdminActionHandler = async (data: {
  action: string;
  targetId: string;
  targetType: string;
  description: string;
  userId: string;
}) => {
  const { action, targetId, targetType, description, userId } = data;

  try {
    const adminAction = new AdminAction({
      admin: userId,
      action,
      targetId,
      targetType,
      description,
      performedAt: new Date(),
    });
    await adminAction.save();

    return {
      message: "Admin action logged successfully",
      adminAction,
    };
  } catch (err: any) {
    throw new Error("Server error", err.message);
  }
};

// Controller to get all admin actions
export const getAdminActions = async () => {
  try {
    const adminActions = await AdminAction.find().populate(
      "admin",
      "name email"
    );

    if (!adminActions || adminActions.length === 0) {
      throw new Error("No admin actions found");
    }

    return { adminActions };
  } catch (err: any) {
    throw new Error("Server error", err.message);
  }
};

// Controller to delete an admin action
export const deleteAdminAction = async (id: string) => {
  try {
    const action = await AdminAction.findById(id);

    if (!action) {
      throw new Error("Action not found");
    }

    await action?.deleteOne();

    return { message: "Action deleted successfully" };
  } catch (err: any) {
    throw new Error("Server error", err.message);
  }
};

// Controller to promote a user to admin
export const promoteUser = async (data: {
  email: string;
  promoterId: string;
  promoterName: string;
}) => {
  const { email, promoterId, promoterName } = data;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === "admin") {
      throw new Error("User is already an admin");
    }

    // Promote user to admin
    user.role = "admin";
    await user.save();

    // Log the promotion action
    const adminAction = new AdminAction({
      admin: promoterId,
      action: "Promoted User to Admin",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was promoted to admin by superadmin "${promoterName}".`,
      performedAt: new Date(),
    });
    await adminAction.save();

    return {
      message: `User "${user.name}" has been promoted to admin`,
      user,
    };
  } catch (err: any) {
    throw new Error("Server error", err.message);
  }
};

// Controller to demote an admin to a regular user
export const demoteUser = async (data: {
  email: string;
  demoterId: string;
  demoterName: string;
}) => {
  const { email } = data;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "admin") {
      throw new Error("User is not an admin");
    }

    // Demote user to regular user
    user.role = "user";
    await user.save();

    // Log the demotion action
    const adminAction = new AdminAction({
      admin: data.demoterId,
      action: "Demoted User to Regular User",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was demoted to regular user by superadmin "${data.demoterName}".`,
      performedAt: new Date(),
    });
    await adminAction.save();

    return {
      message: `User "${user.name}" has been demoted to regular user`,
      user,
    };
  } catch (err: any) {
    throw new Error("Server error", err.message);
  }
};
