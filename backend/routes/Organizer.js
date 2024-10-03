const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const Event = require("../models/Event");
const User = require("../models/User");
const router = express.Router();

// Middleware to check if user is the main organizer
const isOrganizer = async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  
  if (event.organizer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Access denied. Only the organizer can add/remove co-organizers." });
  }

  req.event = event;
  next();
};

const isOrganizerOrCoOrganizer = async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (!event.isOrganizer(req.user.id) && !event.isCoOrganizer(req.user.id)) {
    return res.status(403).json({ message: "Access denied. Only organizers or co-organizers can update event details." });
  }

  req.event = event;
  next();
};

router.post("/event/:eventId/add-co-organizer", authenticateToken, isOrganizer, async (req, res) => {
  try {
    const { coOrganizerEmail } = req.body;

    // Find the user by their email
    const user = await User.findOne({ email: coOrganizerEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add co-organizer if not already added
    if (!req.event.co_organizers.includes(user._id)) {
      req.event.co_organizers.push(user._id);
      await req.event.save();
    } else {
      return res.status(400).json({ message: "User is already a co-organizer" });
    }

    return res.status(200).json({ message: "Co-organizer added successfully", event: req.event });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Route to remove a co-organizer by email
router.post("/event/:eventId/remove-co-organizer", authenticateToken, isOrganizer, async (req, res) => {
  try {
    const { coOrganizerEmail } = req.body;

    // Find the user by their email
    const user = await User.findOne({ email: coOrganizerEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove co-organizer if they exist in the array
    req.event.co_organizers = req.event.co_organizers.filter(
      (coOrganizer) => coOrganizer.toString() !== user._id.toString()
    );

    await req.event.save();

    return res.status(200).json({ message: "Co-organizer removed successfully", event: req.event });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Route to update event details (organizer or co-organizer can update)
router.put("/event/:eventId/update", authenticateToken, isOrganizerOrCoOrganizer, async (req, res) => {
  try {
    const { name, location, date, maxTickets, ticketPrice } = req.body;
    if (name) req.event.name = name;
    if (location) req.event.location = location;
    if (date) req.event.date = date;
    if (maxTickets) req.event.maxTickets = maxTickets;
    if (ticketPrice) req.event.ticketPrice = ticketPrice;

    await req.event.save();

    return res.status(200).json({ message: "Event details updated successfully", event: req.event });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
