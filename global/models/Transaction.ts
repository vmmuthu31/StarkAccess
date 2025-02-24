import { z } from "zod";
import { Document, Schema, model, Types } from "mongoose";

// Define the TypeScript interface for Transaction documents
export interface ITransaction extends Document {
  buyer: Types.ObjectId;
  seller: Types.ObjectId;
  ticket: Types.ObjectId;
  price: number;
  transactionDate: Date;
  status: "completed" | "pending";
}

// Create a Zod schema for validating Transaction input data
export const TransactionValidationSchema = z.object({
  buyer: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid buyer ObjectId",
  }),
  seller: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid seller ObjectId",
  }),
  ticket: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ticket ObjectId",
  }),
  price: z.number(),
  transactionDate: z.date().optional(),
  status: z.enum(["completed", "pending"]).optional(),
});

// Define the Mongoose schema for Transaction
const TransactionSchema = new Schema<ITransaction>({
  buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ticket: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
  price: { type: Number, required: true },
  transactionDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["completed", "pending"], default: "pending" },
});

// Export the Mongoose model for Transaction
export default model<ITransaction>("Transaction", TransactionSchema);
