import express from "express";
import {
  AuthenticatedAdminRequest,
  AuthenticatedRequest,
} from "../interfaces/request";
import { BookingModel } from "../db/booking";

export async function addBooking(
  req: AuthenticatedRequest,
  res: express.Response
) {
  try {
    const { contact_number, location } = req.body;
    if (!contact_number || !location) {
      return res
        .status(400)
        .json({ message: "contact_number and location are required fields" })
        .end();
    }

    const booking = await new BookingModel({
      contact_number,
      location,
      user: req.user._id,
    })
      .save()
      .then((booking) => booking.toObject());

    return res.status(200).json(booking).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function getAllBookings(
  _req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const bookings = await BookingModel.find({}).populate("user");
    return res.status(200).json(bookings).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
