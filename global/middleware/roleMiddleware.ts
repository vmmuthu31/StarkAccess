import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticateToken";
import Event, { IEvent } from "../models/Event";

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

export async function checkEventOrganizer(
  eventId: string,
  userId: string
): Promise<IEvent | null> {
  const event = await Event.findById(eventId);
  if (!event) return null;

  if (event.organizer.toString() !== userId) {
    return null;
  }

  return event;
}

export async function checkEventOrganizerOrCoOrganizer(
  eventId: string,
  userId: string
): Promise<IEvent | null> {
  const event = await Event.findById(eventId);
  if (!event) return null;

  if (!event.isOrganizer(userId) && !event.isCoOrganizer(userId)) {
    return null;
  }

  return event;
}
