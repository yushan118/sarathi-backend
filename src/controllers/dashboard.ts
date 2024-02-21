import express from "express";
import { AuthenticatedAdminRequest } from "../interfaces/request";
import { BookingModel } from "../db/booking";
import { UserModel } from "../db/users";

// Controller function to fetch dashboard statistics for the admin
export async function dashboard(
  _req: AuthenticatedAdminRequest,    // Assuming AuthenticatedAdminRequest provides the necessary details
  res: express.Response
) {
  try {

    // Count the total number of bookings
    const bookingsCount = await BookingModel.countDocuments();

    // Count the total number of users
    const usersCount = await UserModel.countDocuments();

    // Count the number of assigned bookings
    const assignedCount = await BookingModel.countDocuments({
      status: { $ne: "Waiting to be approved by admin" },
    });

    // Count the number of completed bookings
    const completedCount = await BookingModel.countDocuments({
      status: { $ne: "Arrived on hospital" },
    });

    // Respond with the dashboard statistics
    return res
      .status(200)
      .json({
        bookings_count: bookingsCount,
        users_count: usersCount,
        assigned_count: assignedCount,
        completed_count: completedCount,
      })
      .end();
  } catch (error) {
    console.log(error);     // Log the error for debugging purposes
    res.status(400).json({ message: "Something went wrong" });    // Respond with a generic error message if an exception occurs
  }
}
