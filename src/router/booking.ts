import express from "express";
import { addBooking, getAllBookings } from "../controllers/bookings";
import { isAdminAuthenticated, isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/bookings/add", isAuthenticated, addBooking);
  router.get("/bookings/all", isAdminAuthenticated, getAllBookings);
};
