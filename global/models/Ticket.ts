import { z } from "zod";
import { Document, Schema, model, Types } from "mongoose";

// Define the TypeScript interface for Ticket documents
export interface ITicket extends Document {
  event: Types.ObjectId;
  owner: Types.ObjectId;
  ticketID: string;
  zkSNARKsProof: string;
  isValid: boolean;
  issuedAt: Date;
  soldOnMarketplace: boolean;
}

// Create a Zod schema for validating Ticket input data
export const TicketValidationSchema = z.object({
  event: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid event ObjectId",
  }),
  owner: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid owner ObjectId",
  }),
  ticketID: z.string(),
  zkSNARKsProof: z.string(),
  isValid: z.boolean().optional(),
  issuedAt: z.date().optional(),
  soldOnMarketplace: z.boolean().optional(),
});

// Define the Mongoose schema for Ticket
const TicketSchema = new Schema<ITicket>({
  event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ticketID: { type: String, required: true, unique: true },
  zkSNARKsProof: { type: String, required: true },
  isValid: { type: Boolean, default: true },
  issuedAt: { type: Date, default: Date.now },
  soldOnMarketplace: { type: Boolean, default: false },
});

// Export the Mongoose model for Ticket
export default model<ITicket>("Ticket", TicketSchema);
