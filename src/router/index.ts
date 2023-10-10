import express from "express";

import authentication from "./authentication";
import users from "./users";
import admin from "./admin";
import bookings from "./booking";
import dashboard from "./dashboard";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  admin(router);
  bookings(router);
  dashboard(router);

  return router;
};
