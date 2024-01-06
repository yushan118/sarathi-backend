import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: Schema.Types.ObjectId;
  name: string;
  mobile_number: string;
  is_suspended: boolean;
}

interface IUserAuthentication {
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

const UserSchema = new mongoose.Schema<IUser & IUserAuthentication>({
  name: { type: String, required: true },
  mobile_number: { type: String, required: true },
  is_suspended: { type: Boolean, required: true, default: false },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);
