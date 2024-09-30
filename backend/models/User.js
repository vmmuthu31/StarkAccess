const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "organizer", "admin", "superadmin"],
    default: "user",
  },
  walletAddress: { type: String },
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);