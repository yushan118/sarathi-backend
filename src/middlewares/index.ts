import { UserModel } from "../db/users";
import express from "express";
import { AuthenticatedRequest } from "../interfaces/request";

export async function isAuthenticated(
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const sessionToken = req.headers.authorization;
    if (!sessionToken) {
      return res.status(403).json({ message: "Should be authenticated" });
    }

    const existingUser = await UserModel.findOne({
      "authentication.sessionToken": sessionToken,
    });
    if (!existingUser) {
      return res
        .status(403)
        .json({ message: "No user exists given the token" });
    }

    req.user = existingUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
