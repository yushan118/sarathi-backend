import express from "express";
import {
  addBooking,
  getAllBookings,
  getBookingInfo,
  getBookingsOfPhone,
  getMyBookings,
  setStatus,
} from "../controllers/bookings";
import { isAuthenticated } from "../middlewares";

// Exporting a function that sets up routes on the provided express.Router instance
export default (router: express.Router) => {
  router.post("/bookings/add", isAuthenticated, addBooking);      // Setting up a POST route for "/bookings/add"
  router.get("/bookings/all", getAllBookings);       // Setting up a GET route for "/bookings/all"
  router.post("/bookings/set-status", setStatus);   // Setting up a POST route for "/bookings/set-status"
  router.get("/bookings/:id", getBookingInfo);     // Setting up a GET route for "/bookings/:id"

  // Setting up a GET route for "/bookings/list/my"
  // This route is protected by the isAuthenticated middleware
  router.get("/bookings/list/my", isAuthenticated, getMyBookings);

  // Setting up a GET route for "/bookings/list/:phone"
  router.get("/bookings/list/:phone", getBookingsOfPhone);
};
