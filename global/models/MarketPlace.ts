import { z } from "zod";
import { Document, Schema, model, Types } from "mongoose";

export interface IMarketplace extends Document {
  seller: Types.ObjectId;
  ticket: Types.ObjectId;
  price: number;
  status: "available" | "sold";
  listedAt: Date;
}

export const MarketplaceValidationSchema = z.object({
  seller: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid seller ObjectId",
  }),
  ticket: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ticket ObjectId",
  }),
  price: z.number(),
  status: z.enum(["available", "sold"]).optional(),
  listedAt: z.date().optional(),
});

const MarketplaceSchema = new Schema<IMarketplace>({
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ticket: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["available", "sold"], default: "available" },
  listedAt: { type: Date, default: Date.now },
});

export default model<IMarketplace>("Marketplace", MarketplaceSchema);
