import { Request, Response, RequestHandler } from "express";
import axios from "axios";
import User from "../models/User";
import AdminAction from "../models/AdminAction";
import { AuthenticatedRequest } from "../middleware/authenticateToken";

type AuthRequestHandler = RequestHandler<
  any,
  any,
  any,
  any,
  AuthenticatedRequest
>;

// Get all users (excluding password)
export const getAllUsers: AuthRequestHandler = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      res.status(404).json({ message: "No users found" });
      return;
    }
    res.status(200).json({ users });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a specific user by ID (excluding password)
export const getUserById: AuthRequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a user by ID and log the action
export const deleteUser: AuthRequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await user.deleteOne();

    // Prepare the admin action log
    const adminAction = {
      action: "Deleted User",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was deleted by admin.`,
    };

    // Send admin action log via axios POST request
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    await axios.post(`/api/admin/action`, adminAction, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Suspend a user for a given duration (in days)
export const suspendUser: AuthRequestHandler = async (req, res) => {
  const { suspensionDuration, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.isBanned) {
      res
        .status(400)
        .json({ message: "User is banned and cannot be suspended" });
      return;
    }

    const suspensionEndDate = new Date();
    suspensionEndDate.setDate(suspensionEndDate.getDate() + suspensionDuration);

    user.isSuspended = true;
    user.suspensionEndDate = suspensionEndDate;
    await user.save();

    const adminAction = new AdminAction({
      admin: (req as any).user.id,
      action: "Suspended User",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was suspended for ${suspensionDuration} days by admin.`,
      performedAt: new Date(),
    });
    await adminAction.save();

    res.status(200).json({
      message: `User "${user.name}" has been suspended for ${suspensionDuration} days`,
      user,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Ban a user permanently
export const banUser: AuthRequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.isBanned = true;
    user.isSuspended = false; // Clear any active suspension
    user.suspensionEndDate = null;
    await user.save();

    const adminAction = new AdminAction({
      admin: (req as any).user.id,
      action: "Banned User",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was permanently banned by admin "${
        (req as any).user.name
      }".`,
      performedAt: new Date(),
    });
    await adminAction.save();

    res.status(200).json({
      message: `User "${user.name}" has been permanently banned`,
      user,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Revive a user (remove suspension or ban)
export const reviveUser: AuthRequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!user.isSuspended && !user.isBanned) {
      res.status(400).json({ message: "User is not suspended or banned" });
      return;
    }

    user.isSuspended = false;
    user.suspensionEndDate = null;
    user.isBanned = false;
    await user.save();

    const adminAction = new AdminAction({
      admin: (req as any).user.id,
      action: "Revived User",
      targetId: user._id,
      targetType: "user",
      description: `User "${
        user.name
      }" was revived (suspension or ban removed) by admin "${
        (req as any).user.name
      }".`,
      performedAt: new Date(),
    });
    await adminAction.save();

    res.status(200).json({
      message: `User "${user.name}" has been revived (suspension/ban removed)`,
      user,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
