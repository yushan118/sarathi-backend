import express from "express";
import { AuthenticatedAdminRequest } from "../interfaces/request";

export async function currentAdminUser(
  req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    return res.json(req.admin);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
