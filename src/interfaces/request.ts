import { IUser } from "../db/users";
import express from "express";

export interface AuthenticatedRequest extends express.Request {
  user: IUser;
}
