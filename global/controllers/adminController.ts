import { Request, Response, RequestHandler } from "express";
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

// Controller to log an admin action
export const createAdminAction: AuthenticatedRequestHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { action, targetId, targetType, description } = req.body;

  try {
    const adminAction = new AdminAction({
      admin: (req.user as any).id,
      action,
      targetId,
      targetType,
      description,
      performedAt: new Date(),
    });
    await adminAction.save();

    res.status(201).json({
      message: "Admin action logged successfully",
      adminAction,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Controller to get all admin actions
export const getAdminActions: AuthenticatedRequestHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const adminActions = await AdminAction.find().populate(
      "admin",
      "name email"
    );

    if (!adminActions || adminActions.length === 0) {
      res.status(404).json({ message: "No admin actions found" });
      return;
    }

    res.status(200).json({ adminActions });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Controller to delete an admin action
export const deleteAdminAction: AuthenticatedRequestHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const action = await AdminAction.findById(req.params.id);

    if (!action) {
      res.status(404).json({ message: "Action not found" });
    }

    await action?.deleteOne();

    res.status(200).json({ message: "Action deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Controller to promote a user to admin
export const promoteUser: AuthenticatedRequestHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role === "admin") {
      res.status(400).json({ message: "User is already an admin" });
      return;
    }

    // Promote user to admin
    user.role = "admin";
    await user.save();

    // Log the promotion action
    const adminAction = new AdminAction({
      admin: (req.user as any).id,
      action: "Promoted User to Admin",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was promoted to admin by superadmin "${
        (req.user as any).name
      }".`,
      performedAt: new Date(),
    });
    await adminAction.save();

    res.status(200).json({
      message: `User "${user.name}" has been promoted to admin`,
      user,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Controller to demote an admin to a regular user
export const demoteUser: AuthenticatedRequestHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role !== "admin") {
      res.status(400).json({ message: "User is not an admin" });
      return;
    }

    // Demote user to regular user
    user.role = "user";
    await user.save();

    // Log the demotion action
    const adminAction = new AdminAction({
      admin: (req.user as any).id,
      action: "Demoted User to Regular User",
      targetId: user._id,
      targetType: "user",
      description: `User "${
        user.name
      }" was demoted to regular user by superadmin "${
        (req.user as any).name
      }".`,
      performedAt: new Date(),
    });
    await adminAction.save();

    res.status(200).json({
      message: `User "${user.name}" has been demoted to regular user`,
      user,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
