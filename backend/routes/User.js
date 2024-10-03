const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");
const { default: axios } = require("axios");
const { URL } = require("../constants");
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



module.exports = router;
