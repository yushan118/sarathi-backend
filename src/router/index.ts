import express from "express";

import authentication from "./authentication";
import users from "./users";
import admin from "./admin";
import bookings from "./booking";
import dashboard from "./dashboard";
import ambulance from "./ambulance";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  admin(router);
  ambulance(router);
  bookings(router);
  dashboard(router);

  return router;
};
