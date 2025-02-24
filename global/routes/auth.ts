import express from "express";
import {
  register,
  login,
  changePassword,
  logout,
} from "../controllers/authController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router();

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route for changing password (requires authentication)
router.post("/change-password", authenticateToken, changePassword);

// Route for user logout
router.post("/logout", logout);

export default router;
