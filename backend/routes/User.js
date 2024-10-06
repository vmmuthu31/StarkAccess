const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");
const { default: axios } = require("axios");
const { URL } = require("../constants");
const AdminAction = require("../models/AdminAction");
const router = express.Router();

// Middleware to check if the user is admin or superadmin
const isAdmin = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "superadmin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
};

router.get("/all-users", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    const adminAction = {
      action: "Deleted User",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was deleted by admin.`,
    };

    await axios.post(`${URL}/api/admin/action`, adminAction, {
      headers: { Authorization: `Bearer ${req.headers['authorization'].split(' ')[1]}` }, // Assuming JWT is used for authentication
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

router.put("/suspend", authenticateToken, isAdmin, async (req, res) => {
  const { suspensionDuration, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isBanned) {
      return res.status(400).json({ message: "User is banned and cannot be suspended" });
    }

    const suspensionEndDate = new Date();
    suspensionEndDate.setDate(suspensionEndDate.getDate() + suspensionDuration);

    user.isSuspended = true;
    user.suspensionEndDate = suspensionEndDate;
    await user.save();

    // Log the suspension action
    const adminAction = new AdminAction({
      admin: req.user.id,
      action: "Suspended User",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was suspended for ${suspensionDuration} days by admin.`,
      performedAt: new Date(),
    });
    await adminAction.save();

    return res.status(200).json({ message: `User "${user.name}" has been suspended for ${suspensionDuration} days`, user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/ban", authenticateToken, isAdmin, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBanned = true;
    user.isSuspended = false; // Clear any active suspension
    user.suspensionEndDate = null;
    await user.save();

    // Log the ban action
    const adminAction = new AdminAction({
      admin: req.user.id,
      action: "Banned User",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was permanently banned by admin "${req.user.name}".`,
      performedAt: new Date(),
    });
    await adminAction.save();

    return res.status(200).json({ message: `User "${user.name}" has been permanently banned`, user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.put("/revive", authenticateToken, isAdmin, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isSuspended && !user.isBanned) {
      return res.status(400).json({ message: "User is not suspended or banned" });
    }

    user.isSuspended = false;
    user.suspensionEndDate = null;
    user.isBanned = false;
    await user.save();

    // Log the revive action
    const adminAction = new AdminAction({
      admin: req.user.id,
      action: "Revived User",
      targetId: user._id,
      targetType: "user",
      description: `User "${user.name}" was revived (suspension or ban removed) by admin "${req.user.name}".`,
      performedAt: new Date(),
    });
    await adminAction.save();

    return res.status(200).json({ message: `User "${user.name}" has been revived (suspension/ban removed)`, user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});




module.exports = router;
