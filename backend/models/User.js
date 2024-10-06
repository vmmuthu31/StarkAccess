const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  walletAddress: { type: String },
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  isSuspended: { type: Boolean, default: false },
  suspensionEndDate: { type: Date, default: null },
  isBanned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
