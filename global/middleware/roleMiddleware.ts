import { AuthenticatedRequest } from "./authenticateToken";
import Event, { IEvent } from "../models/Event";
import { NextResponse } from "next/server";

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

export const isAdmin = (user: { role?: string }): boolean => {
  return user?.role === "admin" || user?.role === "superadmin";
};

export const isOrganizer = async (
  req: RequestWithEventId
): Promise<NextResponse> => {
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  if (event.organizer.toString() !== (req as any).user.id) {
    return NextResponse.json(
      {
        message:
          "Access denied. Only the organizer can add/remove co-organizers.",
      },
      { status: 403 }
    );
  }

  // Attach the event to the request object for later use
  (req as any).event = event;
  return NextResponse.json({ message: "Authorized", event });
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
