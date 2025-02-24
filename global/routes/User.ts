import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { isAdmin } from "../middleware/roleMiddleware";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  suspendUser,
  banUser,
  reviveUser,
} from "../controllers/userController";

const router = express.Router();

// Route to get all users
router.get("/all-users", authenticateToken, isAdmin, getAllUsers);

// Route to get a specific user by ID
router.get("/:id", authenticateToken, isAdmin, getUserById);

// Route to delete a user by ID
router.delete("/:id", authenticateToken, isAdmin, deleteUser);

// Route to suspend a user
router.put("/suspend", authenticateToken, isAdmin, suspendUser);

// Route to ban a user
router.put("/ban", authenticateToken, isAdmin, banUser);

// Route to revive a user (remove suspension or ban)
router.put("/revive", authenticateToken, isAdmin, reviveUser);

export default router;
