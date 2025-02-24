import { IEvent } from "@/global/models/Event";
import User from "@/global/models/User";

export async function addCoOrganizer(data: {
  eventId: string;
  coOrganizerEmail: string;
  event: IEvent;
}) {
  const { coOrganizerEmail, event } = data;

  const user = await User.findOne({ email: coOrganizerEmail });
  if (!user) {
    throw Object.assign(new Error("User not found"), { status: 404 });
  }

  // Check if the user is already a co-organizer
  if (!event.co_organizers.includes(user._id)) {
    event.co_organizers.push(user._id);
    await event.save();
  } else {
    throw Object.assign(new Error("User is already a co-organizer"), {
      status: 400,
    });
  }

  return {
    message: "Co-organizer added successfully",
    event,
  };
}

export async function removeCoOrganizer(data: {
  eventId: string;
  coOrganizerEmail: string;
  event: IEvent;
}) {
  const { coOrganizerEmail, event } = data;

  const user = await User.findOne({ email: coOrganizerEmail });
  if (!user) {
    throw Object.assign(new Error("User not found"), { status: 404 });
  }

  event.co_organizers = event.co_organizers.filter(
    (coOrganizer) => coOrganizer.toString() !== user._id.toString()
  );
  await event.save();

  return {
    message: "Co-organizer removed successfully",
    event,
  };
}

export async function updateEvent(data: {
  event: IEvent;
  name?: string;
  location?: string;
  date?: Date;
  maxTickets?: number;
  ticketPrice?: number;
}) {
  const { event, name, location, date, maxTickets, ticketPrice } = data;

  if (name) event.name = name;
  if (location) event.location = location;
  if (date) event.date = date;
  if (maxTickets) event.maxTickets = maxTickets;
  if (ticketPrice) event.ticketPrice = ticketPrice;

  await event.save();

  return {
    message: "Event details updated successfully",
    event,
  };
}
