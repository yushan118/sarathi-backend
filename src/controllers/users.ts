import express from "express";
import { AuthenticatedRequest } from "../interfaces/request";

export async function currentUser(
  req: AuthenticatedRequest,
  res: express.Response
) {
  try {
    return res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
