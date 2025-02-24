import express from "express";
import { NextFunction, Response } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { isSuperAdmin, isAdmin } from "../middleware/roleMiddleware";
import {
  createAdminAction,
  getAdminActions,
  deleteAdminAction,
  promoteUser,
  demoteUser,
} from "../controllers/adminController";
import { AuthenticatedRequest } from "../middleware/authenticateToken";

const router = express.Router();

// POST /action - Log an admin action; requires authentication and admin role
router.post("/action", authenticateToken, isAdmin, createAdminAction);

// GET /actions - Get all admin actions; requires authentication and superadmin role
router.get("/actions", authenticateToken, isSuperAdmin, getAdminActions);

// DELETE /action/:id - Delete an admin action; requires authentication and superadmin role
router.delete(
  "/action/:id",
  authenticateToken,
  isSuperAdmin,
  deleteAdminAction
);

// PUT /promote - Promote a user to admin; requires authentication and superadmin role
router.put("/promote", authenticateToken, isSuperAdmin, promoteUser);

// PUT /demote - Demote an admin to a regular user; requires authentication and superadmin role
router.put("/demote", authenticateToken, isSuperAdmin, demoteUser);

export default router;
