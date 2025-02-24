import { RequestHandler } from "express";
import User from "../models/User";
import { IUser } from "../models/User";
import { RequestWithEventId } from "../middleware/roleMiddleware";

type EventRequestHandler = RequestHandler<
  { eventId: string },
  any,
  any,
  any,
  RequestWithEventId
>;

export const addCoOrganizer: EventRequestHandler = async (req, res) => {
  try {
    const { coOrganizerEmail } = req.body;
    const event = (req as any).event;
    const user = (await User.findOne({ email: coOrganizerEmail })) as IUser;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the user is already a co-organizer
    if (!event.co_organizers.includes(user._id)) {
      event.co_organizers.push(user._id);
      await event.save();
    } else {
      res.status(400).json({ message: "User is already a co-organizer" });
      return;
    }

    res.status(200).json({ message: "Co-organizer added successfully", event });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const removeCoOrganizer: EventRequestHandler = async (req, res) => {
  try {
    const { coOrganizerEmail } = req.body;
    const event = (req as any).event;

    const user = (await User.findOne({ email: coOrganizerEmail })) as IUser;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    event.co_organizers = event.co_organizers.filter(
      (coOrganizer: any) => coOrganizer.toString() !== user._id.toString()
    );
    await event.save();

    res
      .status(200)
      .json({ message: "Co-organizer removed successfully", event });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateEvent: EventRequestHandler = async (req, res) => {
  try {
    const { name, location, date, maxTickets, ticketPrice } = req.body;
    const event = (req as any).event;

    if (name) event.name = name;
    if (location) event.location = location;
    if (date) event.date = date;
    if (maxTickets) event.maxTickets = maxTickets;
    if (ticketPrice) event.ticketPrice = ticketPrice;

    await event.save();
    res
      .status(200)
      .json({ message: "Event details updated successfully", event });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
