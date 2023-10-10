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

    return res
      .status(200)
      .json({
        bookings_count: bookingsCount,
        users_count: usersCount,
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
