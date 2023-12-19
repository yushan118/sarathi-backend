import express from "express";
import { AuthenticatedAdminRequest } from "../interfaces/request";
import { BookingModel } from "../db/booking";
import { UserModel } from "../db/users";

export async function dashboard(
  _req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const bookingsCount = await BookingModel.countDocuments();
    const usersCount = await UserModel.countDocuments();
    const assignedCount = await BookingModel.countDocuments({
      status: { $ne: "Waiting to be approved by admin" },
    });
    const completedCount = await BookingModel.countDocuments({
      status: { $ne: "Arrived on hospital" },
    });

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
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
