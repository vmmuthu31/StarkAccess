const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const AdminAction = require("../models/AdminAction"); // Assuming AdminAction model exists
const User = require("../models/User");
const router = express.Router();

const issuperAdmin = (req, res, next) => {
    if (req.user.role === "superadmin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied. SuperAdmin only." });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "superadmin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied. Admin only." });
    }
};

router.post("/action", authenticateToken, isAdmin, async (req, res) => {
    const { action, targetId, targetType, description } = req.body;

    try {
        const adminAction = new AdminAction({
            admin: req.user.id,
            action,
            targetId,
            targetType,
            description,
            performedAt: new Date(),
        });
        await adminAction.save();

        return res.status(201).json({ message: "Admin action logged successfully", adminAction });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.get("/actions", authenticateToken, issuperAdmin, async (req, res) => {
    try {
        // Fetch all admin actions
        const adminActions = await AdminAction.find().populate("admin", "name email");

        if (!adminActions || adminActions.length === 0) {
            return res.status(404).json({ message: "No admin actions found" });
        }

        return res.status(200).json({ adminActions });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.delete("/action/:id", authenticateToken, issuperAdmin, async (req, res) => {
    try {
        const action = await AdminAction.findById(req.params.id);

        if (!action) {
            return res.status(404).json({ message: "action not found" });
        }

        await action.deleteOne();

        return res.status(200).json({ message: "action deleted successfully" });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Server error", error: err.message });
    }
});

router.put("/promote", authenticateToken, issuperAdmin, async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({ message: "User is already an admin" });
        }

        // Promote user to admin
        user.role = "admin";
        await user.save();

        // Log the promotion action
        const adminAction = new AdminAction({
            admin: req.user.id,
            action: "Promoted User to Admin",
            targetId: user._id,
            targetType: "user",
            description: `User "${user.name}" was promoted to admin by superadmin "${req.user.name}".`,
            performedAt: new Date(),
        });
        await adminAction.save();

        return res.status(200).json({ message: `User "${user.name}" has been promoted to admin`, user });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.put("/demote", authenticateToken, issuperAdmin, async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(400).json({ message: "User is not an admin" });
        }

        // Demote user to regular user
        user.role = "user";
        await user.save();

        // Log the demotion action
        const adminAction = new AdminAction({
            admin: req.user.id,
            action: "Demoted User to Regular User",
            targetId: user._id,
            targetType: "user",
            description: `User "${user.name}" was demoted to regular user by superadmin "${req.user.name}".`,
            performedAt: new Date(),
        });
        await adminAction.save();

        return res.status(200).json({ message: `User "${user.name}" has been demoted to regular user`, user });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});


module.exports = router;
