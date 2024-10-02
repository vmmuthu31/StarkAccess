const express = require("express");
const Event = require("../models/Event");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");
const { eventCreationEmailTemplate } = require("../utils/templates");
const sendEmail = require("../utils/SendEmail");
const router = express.Router();

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "superadmin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
};

router.post("/create-event", authenticateToken, async (req, res) => {
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
      organizer: req.user.id,
    });

    await event.save();

    const user = await User.findById(req.user.id);

    const subject = "Your Event is Live!";
    const html = eventCreationEmailTemplate(user.name, name);
    await sendEmail(user.email, subject, html);

    return res
      .status(201)
      .json({ message: "Event created successfully", event });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

router.get("/all-events", authenticateToken, isAdmin, async (req, res) => {
  try {
    const events = await Event.find();

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }

    return res.status(200).json({ events });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

router.get("/event/:id", authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ event });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

router.get("/my-events", authenticateToken, async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id });

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this user." });
    }

    return res
      .status(200)
      .json({ message: "Events retrieved successfully", events });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

router.delete("/event/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});


module.exports = router;


