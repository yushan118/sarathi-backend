import express from "express";

import authentication from "./authentication";
import users from "./users";
import admin from "./admin";
import bookings from "./booking";
import dashboard from "./dashboard";
import ambulance from "./ambulance";

// Creating an instance of express.Router
const router = express.Router();

// Exporting a function that sets up various routes on the provided express.Router instance
export default (): express.Router => {

  // Importing and calling route setup functions for different modules
  authentication(router);
  users(router);
  admin(router);
  ambulance(router);
  bookings(router);
  dashboard(router);

  // Returning the configured router
  return router;
};
