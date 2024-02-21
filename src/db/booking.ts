import mongoose, { Schema } from "mongoose";

// Define the Mongoose schema for the Booking document
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
    hospital: { type: "String" },
    case_sensitivity: {
      type: "String",
      enum: ["High", "Medium", "Low", "Unknown"],
      default: "Unknown",
    },
    survival_rate: {
      type: "String",
      enum: ["High", "Medium", "Low", "Unknown"],
      default: "Unknown",
    },
    timeline: [
      {
        status: { type: "String", required: true },
        at: { type: "Date", required: true, default: Date.now },
      },
    ],
  },
  { timestamps: true }    // Include timestamps for createdAt and updatedAt
);

// Create a Mongoose model for Booking based on the schema
export const BookingModel = mongoose.model("Bookings", BookingSchema);
