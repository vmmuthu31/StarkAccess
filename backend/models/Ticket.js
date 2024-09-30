const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ticketID: { type: String, required: true, unique: true },
  zkSNARKsProof: { type: String, required: true },
  isValid: { type: Boolean, default: true },
  issuedAt: { type: Date, default: Date.now },
  soldOnMarketplace: { type: Boolean, default: false },
});

module.exports = mongoose.model("Ticket", ticketSchema);
