import mongoose, { Schema } from "mongoose";

// Define the structure of the user data
export interface IUser {
  _id: Schema.Types.ObjectId;   // Assuming you want to use MongoDB ObjectId
  name: string;
  mobile_number: string;
  is_suspended: boolean;
}

// Define the structure of the user authentication data
interface IUserAuthentication {
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

// Create the Mongoose schema for User, combining IUser and IUserAuthentication
const UserSchema = new mongoose.Schema<IUser & IUserAuthentication>({
  name: { type: String, required: true },
  mobile_number: { type: String, required: true },
  is_suspended: { type: Boolean, required: true, default: false },
  authentication: {
    password: { type: String, required: true, select: false },     // 'select: false' means this won't be included by default in queries
    salt: { type: String, select: false },    // 'select: false' for security reasons
    sessionToken: { type: String, select: false },    // 'select: false' for security reasons
  },
});

// Create the Mongoose model using the schema
export const UserModel = mongoose.model("User", UserSchema);
