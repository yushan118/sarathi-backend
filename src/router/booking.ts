import express from "express";
import {
  addBooking,
  getAllBookings,
  getBookingInfo,
  getMyBookings,
  setStatus,
} from "../controllers/bookings";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/bookings/add", isAuthenticated, addBooking);
  router.get("/bookings/all", getAllBookings);
  router.post("/bookings/set-status", setStatus);
  router.get("/bookings/:id", getBookingInfo);
  router.get("/bookings/list/my", isAuthenticated, getMyBookings);
  router.get("/bookings/list/:phone", isAuthenticated, getMyBookings);
};
