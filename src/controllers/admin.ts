import express from "express";
import { AuthenticatedAdminRequest } from "../interfaces/request";

// Controller function to get details of the currently authenticated admin user
export async function currentAdminUser(
  req: AuthenticatedAdminRequest,     // Assuming AuthenticatedAdminRequest interface provides the necessary details
  res: express.Response
) {
  try {

  // Assuming req.admin contains the details of the authenticated admin user  
    return res.json(req.admin);   // Respond with the admin user details in JSON format
  } catch (error) {
    console.log(error);   // Log the error for debugging purposes
    res.status(400).json({ message: "Something went wrong" });    // Respond with a generic error message if an exception occurs
  } 
}
