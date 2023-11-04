import mongoose, { Schema } from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contact_number: { type: "String", required: true },
    lat: { type: "Number", required: true },
    lng: { type: "Number", required: true },
    status: {
      type: "String",
      enum: [
        "Waiting to be approved by admin",
        "Approved by admin",
        "Accepted by ambulance",
        "Ambulance on the way",
        "Picked up by ambulance",
        "Arrived on hospital",
      ],
      default: "Waiting to be approved by admin",
    },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model("Bookings", BookingSchema);
