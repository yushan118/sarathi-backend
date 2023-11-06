import express from "express";
import {
  addBooking,
  getAllBookings,
  getBookingInfo,
  setStatus,
} from "../controllers/bookings";
import { isAdminAuthenticated, isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/bookings/add", isAuthenticated, addBooking);
  router.get("/bookings/all", isAdminAuthenticated, getAllBookings);
  router.post("/bookings/set-status", isAdminAuthenticated, setStatus);
  router.get("/bookings/:id", isAdminAuthenticated, getBookingInfo);
};
