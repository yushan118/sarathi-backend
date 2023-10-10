import mongoose, { Schema } from "mongoose";

const BookingSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  contact_number: { type: "String", required: true },
  location: { type: "String", required: true },
});

export const BookingModel = mongoose.model("Bookings", BookingSchema);
