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
  co_organizers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  ticketPrice: { type: Number, required: true },
  maxTickets: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  zkSNARKsProof: { type: String },
  createdAt: { type: Date, default: Date.now },
});

eventSchema.methods.canUserApply = function (userId) {
  return this.organizer.toString() !== userId.toString();
};

eventSchema.methods.isCoOrganizer = function (userId) {
  return this.co_organizers.includes(userId.toString());
};

// Method to check if a user is the main organizer
eventSchema.methods.isOrganizer = function (userId) {
  return this.organizer.toString() === userId.toString();
};

module.exports = mongoose.model("Event", eventSchema);
