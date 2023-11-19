import mongoose, { Schema } from "mongoose";

export interface IAmbulanceUser {
  _id: Schema.Types.ObjectId;
  name: string;
  mobile_number: string;
}

interface IAmbulanceUserAuthentication {
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

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

export const AmbulanceUserModel = mongoose.model(
  "AmbulanceUser",
  AmbulanceUserSchema
);
