import express from "express";
import {
  AuthenticatedAdminRequest,
  AuthenticatedRequest,
} from "../interfaces/request";
import { UserModel } from "../db/users";
import { BookingModel } from "db/booking";    // It seems there might be an issue with the import path, check if it's correct.


// Controller function to get details of the current user
export async function currentUser(
  req: AuthenticatedRequest,
  res: express.Response
) {
  try {
    return res.json(req.user);    // Respond with the details of the authenticated user
  } catch (error) {
    console.log(error);     // Log the error for debugging purposes
    res.status(400).json({ message: "Something went wrong" });    // Respond with a generic error message if an exception occurs
  }
}


// Controller function to get details of all users (for admins)
export async function getAllUsers(
  _req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const users = await UserModel.find();       // Retrieve all users from the database
    return res.status(200).json(users).end();   // Respond with the list of users
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

// Controller function to edit user details (for admins)
export async function editUser(
  req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const { id, name, mobile_number } = req.body;
    if (!id || !name || !mobile_number) {
      return res
        .status(400)
        .json({ message: "id, name and mobile_number are required fields" })
        .end();
    }
    await UserModel.findOneAndUpdate({ _id: id }, { name, mobile_number });     // Update user details in the database
    return res.status(200).json({ success: true }).end();     // Respond with success message
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

// Controller function to suspend or unsuspend a user (for admins)
export async function suspendUser(
  req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const { action } = req.body;
    if (!id || !action) {
      return res
        .status(400)
        .json({ message: "id and action required fields" })
        .end();
    }
    const toSuspend = action == "suspend";
    await UserModel.findOneAndUpdate({ _id: id }, { is_suspended: toSuspend });   // Suspend or unsuspend the user in the database
    return res.status(200).json({ success: true }).end();   // Respond with success message
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

// Controller function to get details of a specific user by mobile number
export async function userDetails(req: express.Request, res: express.Response) {
  try {
    const { mobile_number } = req.params;
    const user = await UserModel.find({ mobile_number });     // Find the user by mobile number
    if (user.length == 0) {
      return res.status(404).json({ message: "User not found" });     // Respond with a 404 status if the user is not found
    }
    return res.status(200).json(user[0]).end();     // Respond with the details of the user
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
