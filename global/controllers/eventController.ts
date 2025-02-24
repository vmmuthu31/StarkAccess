import Event from "@/global/models/Event";
import User from "@/global/models/User";
import AdminAction from "@/global/models/AdminAction";
import { sendEmail, eventCreationEmailTemplate } from "@/global/utils/Mailer";

export async function createEvent(data: {
  name: string;
  description: string;
  date: Date;
  location: string;
  ticketPrice: number;
  maxTickets: number;
  userId: string;
}) {
  const { name, description, date, location, ticketPrice, maxTickets, userId } =
    data;

  const event = new Event({
    name,
    description,
    date,
    location,
    ticketPrice,
    maxTickets,
    organizer: userId,
  });

  await event.save();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const subject = "Your Event is Live!";
  const html = eventCreationEmailTemplate(user.name, name);
  await sendEmail(user.email, subject, html);

  return { message: "Event created", event };
}

export async function getAllEvents() {
  const events = await Event.find();
  if (!events || events.length === 0) {
    throw new Error("No events found.");
  }
  return events;
}

export async function getEventById(eventId: string) {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
}

export async function getMyEvents(userId: string) {
  const events = await Event.find({ organizer: userId });
  if (!events || events.length === 0) {
    throw new Error("No events found for this user.");
  }
  return events;
}

export async function deleteEvent(data: { eventId: string; userId: string }) {
  const { eventId, userId } = data;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  await event.deleteOne();

  const adminAction = new AdminAction({
    admin: userId,
    action: "Deleted Event",
    targetId: event._id,
    targetType: "event",
    description: `Event "${event.name}" was deleted by admin.`,
    performedAt: new Date(),
  });
  await adminAction.save();

  return { message: "Event deleted successfully" };
}

export async function updateEvent(data: {
  eventId: string;
  userId: string;
  userRole: string;
  name?: string;
  description?: string;
  date?: Date;
  location?: string;
  ticketPrice?: number;
  maxTickets?: number;
}) {
  const {
    eventId,
    userId,
    userRole,
    name,
    description,
    date,
    location,
    ticketPrice,
    maxTickets,
  } = data;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizer.toString() !== userId && userRole !== "admin") {
    throw new Error("Access denied. Not the event organizer.");
  }

  event.name = name || event.name;
  event.description = description || event.description;
  event.date = date || event.date;
  event.location = location || event.location;
  event.ticketPrice = ticketPrice || event.ticketPrice;
  event.maxTickets = maxTickets || event.maxTickets;

  await event.save();
  return { message: "Event updated successfully", event };
}
