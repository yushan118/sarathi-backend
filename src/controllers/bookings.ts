import express from "express";
import { AuthenticatedRequest } from "../interfaces/request";
import { BookingModel } from "../db/booking";
import { io } from "../index";

// Controller function to add a new booking
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

// Controller function to get all bookings with optional status filter
export async function getAllBookings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { status } = req.query;

    const bookings = await BookingModel.find(status && { status })
      .sort({ _id: -1 })
      .populate("user");
    return res.status(200).json(bookings).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

// Controller function to get bookings for the authenticated user
export async function getMyBookings(
  req: AuthenticatedRequest,
  res: express.Response
) {
  try {
    const bookings = await BookingModel.find({
      contact_number: req.user.mobile_number,
    })
      .populate("user")
      .sort({ createdAt: -1 });
    return res.status(200).json(bookings).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

// Controller function to get bookings for a specific phone number
export async function getBookingsOfPhone(
  req: express.Request,
  res: express.Response
) {
  try {
    const { phone } = req.params;

    const bookings = await BookingModel.find({
      contact_number: phone,
    })
      .populate("user")
      .sort({ createdAt: -1 });
    return res.status(200).json(bookings).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

// Controller function to get details of a specific booking by its ID
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

// Controller function to update the status and other details of a booking
export async function setStatus(req: express.Request, res: express.Response) {
  try {
    const { id, status, case_sensitivity, survival_rate, hospital } = req.body;
    let updateBody: any = {
      status,
      case_sensitivity,
      survival_rate,
      hospital,
    };
    if (status) {
      updateBody["$push"] = { timeline: { status } };
    }
    io.emit("booking-status-updated", { id });

    await BookingModel.findOneAndUpdate({ _id: id }, updateBody);
    return res.status(200).json({ success: true }).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
