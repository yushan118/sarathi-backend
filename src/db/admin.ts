import mongoose, { Schema } from "mongoose";

// Define the interface for AdminUser document in MongoDB
export interface IAdminUser {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
}

// Define the interface for authentication-related fields
interface IAdminUserAuthentication {
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

// Create a Mongoose schema for AdminUser incorporating both interfaces
const AdminUserSchema = new mongoose.Schema<
  IAdminUser & IAdminUserAuthentication
>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Create a Mongoose model for AdminUser based on the schema
export const AdminUserModel = mongoose.model("AdminUser", AdminUserSchema);
