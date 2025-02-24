import { z } from "zod";
import { Document, Schema, model, Types } from "mongoose";

// Define the TypeScript interface for AdminAction documents
export interface IAdminAction extends Document {
  admin: Types.ObjectId;
  action: string;
  targetId: Types.ObjectId;
  targetType: "user" | "event" | "ticket";
  description?: string;
  performedAt: Date;
}

// Create a Zod schema for validating AdminAction input data
export const AdminActionValidationSchema = z.object({
  admin: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid admin ObjectId",
  }),
  action: z.string(),
  targetId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid target ObjectId",
  }),
  targetType: z.enum(["user", "event", "ticket"]),
  description: z.string().optional(),
  performedAt: z.date().optional(),
});

// Define the Mongoose schema for AdminAction
const AdminActionSchema = new Schema<IAdminAction>({
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  targetId: { type: Schema.Types.ObjectId, required: true },
  targetType: {
    type: String,
    enum: ["user", "event", "ticket"],
    required: true,
  },
  description: { type: String },
  performedAt: { type: Date, default: Date.now },
});

// Export the Mongoose model
export default model<IAdminAction>("AdminAction", AdminActionSchema);
