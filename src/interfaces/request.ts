import { IAdminUser } from "../db/admin";
import { IUser } from "../db/users";
import express from "express";

export interface AuthenticatedRequest extends express.Request {
  user: IUser;
}

export interface AuthenticatedAdminRequest extends express.Request {
  admin: IAdminUser;
}
