import mongoose, { Schema } from "mongoose";

// Define the interface for AmbulanceUser document in MongoDB
export interface IAmbulanceUser {
  _id: Schema.Types.ObjectId;
  name: string;
  mobile_number: string;
}

// Define the interface for authentication-related fields
interface IAmbulanceUserAuthentication {
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

// Create a Mongoose schema for AmbulanceUser incorporating both interfaces
const AmbulanceUserSchema = new mongoose.Schema<
  IAmbulanceUser & IAmbulanceUserAuthentication
>({
  name: { type: String, required: true },
  mobile_number: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Create a Mongoose model for AmbulanceUser based on the schema
export const AmbulanceUserModel = mongoose.model(
  "AmbulanceUser",
  AmbulanceUserSchema
);
