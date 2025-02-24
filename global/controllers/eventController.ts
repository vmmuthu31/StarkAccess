import Event from "../models/Event";
import User from "../models/User";
import { sendEmail, eventCreationEmailTemplate } from "../utils/Mailer";
import axios from "axios";
import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../middleware/authenticateToken";
import AdminAction from "../models/AdminAction";

type AuthRequestHandler = RequestHandler<
  any,
  any,
  any,
  any,
  AuthenticatedRequest
>;

export const createEvent: AuthRequestHandler = async (req, res) => {
  const { name, description, date, location, ticketPrice, maxTickets } =
    req.body;

  try {
    const event = new Event({
      name,
      description,
      date,
      location,
      ticketPrice,
      maxTickets,
      organizer: (req as any).user.id,
    });

    await event.save();

    const user = await User.findById((req as any).user.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const subject = "Your Event is Live!";
    const html = eventCreationEmailTemplate(user.name, name);
    await sendEmail(user.email, subject, html);

    res.status(201).json({ message: "Event created", event });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllEvents: AuthRequestHandler = async (req, res) => {
  try {
    const events = await Event.find();
    if (!events || events.length === 0) {
      res.status(404).json({ message: "No events found." });
      return;
    }
    res.status(200).json({ events });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getEventById: AuthRequestHandler = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ event });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMyEvents: AuthRequestHandler = async (req, res) => {
  try {
    const events = await Event.find({ organizer: (req as any).user.id });
    if (!events || events.length === 0) {
      res.status(404).json({ message: "No events found for this user." });
      return;
    }
    res.status(200).json({ message: "Events retrieved successfully", events });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteEvent: AuthRequestHandler = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    await event.deleteOne();

    const adminAction = new AdminAction({
      admin: (req as any).user.id,
      action: "Deleted Event",
      targetId: event._id,
      targetType: "event",
      description: `Event "${event.name}" was deleted by admin.`,
      performedAt: new Date(),
    });
    await adminAction.save();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateEvent: AuthRequestHandler = async (req, res) => {
  const { name, description, date, location, ticketPrice, maxTickets } =
    req.body;
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    if (
      event.organizer.toString() !== (req as any).user.id &&
      (req as any).user.role !== "admin"
    ) {
      res
        .status(403)
        .json({ message: "Access denied. Not the event organizer." });
      return;
    }
    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.ticketPrice = ticketPrice || event.ticketPrice;
    event.maxTickets = maxTickets || event.maxTickets;

    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
