import { IAmbulanceUser } from "../db/ambulance-user";
import { IAdminUser } from "../db/admin";
import { IUser } from "../db/users";
import express from "express";

// Interface for an authenticated request with a normal user.
export interface AuthenticatedRequest extends express.Request {
  user: IUser;    // Attach user information to the request object.
}


// Interface for an authenticated request with an admin user.
export interface AuthenticatedAdminRequest extends express.Request {
  admin: IAdminUser;    // Attach admin user information to the request object.
}

// Interface for an authenticated request with an ambulance user.
export interface AuthenticatedAmbulanceRequest extends express.Request {
  ambulance_user: IAmbulanceUser;
}
