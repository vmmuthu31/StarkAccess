const mongoose = require("mongoose");

const adminActionSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  targetType: {
    type: String,
    enum: ["user", "event", "ticket"],
    required: true,
  },
  description: { type: String },
  performedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminAction", adminActionSchema);
