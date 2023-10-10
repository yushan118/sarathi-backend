import mongoose, { Schema } from "mongoose";

export interface IAdminUser {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
}

interface IAdminUserAuthentication {
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

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

export const AdminUserModel = mongoose.model("AdminUser", AdminUserSchema);
