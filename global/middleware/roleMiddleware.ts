import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticateToken";
import Event from "../models/Event";

export type RequestWithEventId = AuthenticatedRequest & {
  params: {
    eventId: string;
  };
};

interface HasUser {
  user: {
    role?: string;
    name?: string;
  };
}

export const isSuperAdmin = (req: HasUser): boolean => {
  return req.user?.role === "superadmin";
};

// Express middleware version
export const isSuperAdminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (isSuperAdmin(req as HasUser)) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. SuperAdmin only." });
  }
};

// Middleware to check if the user is an admin or superadmin
export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (
    req.user &&
    ((req.user as any).role === "admin" ||
      (req.user as any).role === "superadmin")
  ) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin only." });
  }
};

export const isOrganizer = async (
  req: RequestWithEventId,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  if (event.organizer.toString() !== (req as any).user.id) {
    res.status(403).json({
      message:
        "Access denied. Only the organizer can add/remove co-organizers.",
    });
    return;
  }

  // Attach the event to the request object for later use
  (req as any).event = event;
  next();
};

// Middleware to check if the current user is an organizer or a co-organizer of the event
export const isOrganizerOrCoOrganizer = async (
  req: RequestWithEventId,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  // Assume that the Event model has instance methods isOrganizer and isCoOrganizer.
  if (
    !event.isOrganizer((req as any).user.id) &&
    !event.isCoOrganizer((req as any).user.id)
  ) {
    res.status(403).json({
      message:
        "Access denied. Only organizers or co-organizers can update event details.",
    });
    return;
  }

  (req as any).event = event;
  next();
};
