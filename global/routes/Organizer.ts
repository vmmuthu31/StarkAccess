import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import {
  isOrganizer,
  isOrganizerOrCoOrganizer,
} from "../middleware/roleMiddleware";
import {
  addCoOrganizer,
  removeCoOrganizer,
  updateEvent,
} from "../controllers/eventOrganizerController";

const router = express.Router();

// Route to add a co-organizer; only the organizer can perform this action
router.post(
  "/event/:eventId/add-co-organizer",
  authenticateToken,
  isOrganizer,
  addCoOrganizer
);

// Route to remove a co-organizer; only the organizer can perform this action
router.post(
  "/event/:eventId/remove-co-organizer",
  authenticateToken,
  isOrganizer,
  removeCoOrganizer
);

// Route to update event details; organizers and co-organizers can perform this action
router.put(
  "/event/:eventId/update",
  authenticateToken,
  isOrganizerOrCoOrganizer,
  updateEvent
);

export default router;
