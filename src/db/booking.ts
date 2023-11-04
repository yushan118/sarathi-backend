import mongoose, { Schema } from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contact_number: { type: "String", required: true },
    lat: { type: "Number", required: true },
    lng: { type: "Number", required: true },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model("Bookings", BookingSchema);
