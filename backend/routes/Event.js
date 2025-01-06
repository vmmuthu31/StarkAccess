const express = require("express");
const Event = require("../models/Event");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");
const { eventCreationEmailTemplate } = require("../utils/templates");
const sendEmail = require("../utils/SendEmail");
const { default: axios } = require("axios");
const { URL } = require("../constants");
const router = express.Router();

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "superadmin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
};
router.post("/create-event", authenticateToken, async (req, res) => {
  const { name, description, date, location, ticketPrice, maxTickets } = req.body;

  // Validate input
  if (!name || !description || !date || !location || !ticketPrice || !maxTickets) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (typeof ticketPrice !== "number" || typeof maxTickets !== "number") {
    return res
      .status(400)
      .json({ message: "ticketPrice and maxTickets must be numbers." });
  }

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

    return res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// // , date,location
// router.post("/create-event", authenticateToken, async (req, res) => {
//   const { name, description ,ticketPrice, maxTickets } =
// req.body;

//   try {
//     const event = new Event({
//       name,
//       description,
//       // date,
//       // location,
//       ticketPrice,
//       maxTickets,
//       organizer: req.user.id,
//     });

//     await event.save();

//     // const user = await User.findById(req.user.id);

//     // const subject = "Your Event is Live!";
//     // const html = eventCreationEmailTemplate(user.name, name);
//     // await sendEmail(user.email, subject, html);

//     return res
//       .status(201)
//       .json({ message: "Event created successfully", event });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// });

// router.get("/all-events", authenticateToken, async (req, res) => {
//   try {
//     const events = await Event.find();

//     if (!events || events.length === 0) {
//       return res.status(404).json({ message: "No events found." });
//     }

//     return res.status(200).json({ events });
//   } catch (err) {
//     console.error("Error fetching events:", err.message);
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

router.get("/all-events", authenticateToken, async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }

    res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (err) {
    console.error("Error fetching events:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
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

const { ObjectId } = require('mongoose').Types;


router.delete("/event/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const eventId = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete the event
    await event.deleteOne();

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/update-event/:id", authenticateToken, async (req, res) => {
  const { name, description, date, location, ticketPrice, maxTickets } = req.body;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.organizer.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not the event organizer." });
    }

    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.ticketPrice = ticketPrice || event.ticketPrice;
    event.maxTickets = maxTickets || event.maxTickets;

    await event.save();
    return res.status(200).json({ message: "Event updated successfully", event });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});



module.exports = router;


