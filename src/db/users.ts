import mongoose from "mongoose";

export interface IUser {
  name: string;
  mobile_number: string;
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
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);
