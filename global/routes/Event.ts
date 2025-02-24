import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController";
import { authenticateToken } from "../middleware/authenticateToken";
import { isAdmin } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/create-event", authenticateToken, createEvent);
router.get("/all-events", authenticateToken, isAdmin, getAllEvents);
router.get("/event/:id", authenticateToken, getEventById);
router.get("/my-events", authenticateToken, getMyEvents);
router.delete("/event/:id", authenticateToken, isAdmin, deleteEvent);
router.put("/update-event/:id", authenticateToken, updateEvent);

export default router;
