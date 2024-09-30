const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
  price: { type: Number, required: true },
  status: { type: String, enum: ["available", "sold"], default: "available" },
  listedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Marketplace", marketplaceSchema);
