const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketPrice: { type: Number, required: true },
  maxTickets: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  zkSNARKsProof: { type: String },
  createdAt: { type: Date, default: Date.now },
});

eventSchema.methods.canUserApply = function (userId) {
  return this.organizer.toString() !== userId.toString();
};

module.exports = mongoose.model("Event", eventSchema);
