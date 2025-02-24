import { z } from "zod";
import { Document, Schema, model, Types } from "mongoose";

// Define the TypeScript interface for Event documents
export interface IEvent extends Document {
  name: string;
  description: string;
  date: Date;
  location: string;
  organizer: Types.ObjectId;
  co_organizers: Types.ObjectId[];
  ticketPrice: number;
  maxTickets: number;
  ticketsSold: number;
  zkSNARKsProof?: string;
  createdAt: Date;
  canUserApply(userId: string | Types.ObjectId): boolean;
  isCoOrganizer(userId: string | Types.ObjectId): boolean;
  isOrganizer(userId: string | Types.ObjectId): boolean;
}

// Create a Zod schema for validating Event input data
export const EventValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.date(),
  location: z.string(),
  organizer: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid organizer ObjectId",
  }),
  co_organizers: z
    .array(
      z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid co-organizer ObjectId",
      })
    )
    .optional(),
  ticketPrice: z.number(),
  maxTickets: z.number(),
  ticketsSold: z.number().optional(),
  zkSNARKsProof: z.string().optional(),
  createdAt: z.date().optional(),
});

// Define the Mongoose schema for Event
const EventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  co_organizers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  ticketPrice: { type: Number, required: true },
  maxTickets: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  zkSNARKsProof: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Add instance methods to the Event schema
EventSchema.methods.canUserApply = function (
  userId: string | Types.ObjectId
): boolean {
  // The main organizer cannot apply, so return true only when the user is different
  return this.organizer.toString() !== userId.toString();
};

EventSchema.methods.isCoOrganizer = function (
  userId: string | Types.ObjectId
): boolean {
  return this.co_organizers
    .map((id: Types.ObjectId) => id.toString())
    .includes(userId.toString());
};

EventSchema.methods.isOrganizer = function (
  userId: string | Types.ObjectId
): boolean {
  return this.organizer.toString() === userId.toString();
};

// Export the Mongoose model
export default model<IEvent>("Event", EventSchema);
