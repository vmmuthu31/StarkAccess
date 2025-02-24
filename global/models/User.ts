import { z } from "zod";
import { Document, Schema, model, Types } from "mongoose";

// Define the TypeScript interface for User documents
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "superadmin";
  walletAddress?: string;
  createdEvents: Types.ObjectId[];
  tickets: Types.ObjectId[];
  isSuspended: boolean;
  suspensionEndDate: Date | null;
  isBanned: boolean;
  createdAt: Date;
}

// Create a Zod schema for validating User input data
export const UserValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["user", "admin", "superadmin"]).optional(),
  walletAddress: z.string().optional(),
  createdEvents: z
    .array(
      z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid createdEvent ObjectId",
      })
    )
    .optional(),
  tickets: z
    .array(
      z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid ticket ObjectId",
      })
    )
    .optional(),
  isSuspended: z.boolean().optional(),
  suspensionEndDate: z.date().nullable().optional(),
  isBanned: z.boolean().optional(),
  createdAt: z.date().optional(),
});

// Define the Mongoose schema for User
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  walletAddress: { type: String },
  createdEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  isSuspended: { type: Boolean, default: false },
  suspensionEndDate: { type: Date, default: null },
  isBanned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Export the Mongoose model for User
export default model<IUser>("User", UserSchema);
