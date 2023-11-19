import express from "express";
import {
  AuthenticatedAdminRequest,
  AuthenticatedAmbulanceRequest,
  AuthenticatedRequest,
} from "../interfaces/request";
import { BookingModel } from "../db/booking";

export async function addBooking(
  req: AuthenticatedRequest,
  res: express.Response
) {
  try {
    const { contact_number, lat, lng } = req.body;
    if (!contact_number || !lat || !lng) {
      return res
        .status(400)
        .json({ message: "contact_number and location are required fields" })
        .end();
    }

    const booking = await new BookingModel({
      contact_number,
      lat,
      lng,
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
  req: express.Request,
  res: express.Response
) {
  try {
    const { status } = req.query;

    const bookings = await BookingModel.find(status && { status }).populate(
      "user"
    );
    return res.status(200).json(bookings).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function getBookingInfo(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;

    const booking = await BookingModel.findById(id).populate("user");
    return res.status(200).json(booking).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function setStatus(req: express.Request, res: express.Response) {
  try {
    const { id, status } = req.body;
    await BookingModel.findOneAndUpdate(
      { _id: id },
      {
        status,
      }
    );
    return res.status(200).json({ success: true }).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
