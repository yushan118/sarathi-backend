import express from "express";
import { AuthenticatedAmbulanceRequest } from "interfaces/request";

export async function currentAmbulanceUser(
  req: AuthenticatedAmbulanceRequest,
  res: express.Response
) {
  try {
    return res.json(req.ambulance_user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
