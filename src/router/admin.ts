import express from "express";
import { currentAdminUser } from "../controllers/admin";
import { isAdminAuthenticated } from "../middlewares";

// Exporting a function that sets up routes on the provided express.Router instance
export default (router: express.Router) => {

  // Setting up a GET route for "/admin/current"
  // This route is intended for retrieving information about the current admin user
  // The middleware `isAdminAuthenticated` ensures that the request is authenticated as an admin user 
  //before executing the associated controller function (`currentAdminUser`).
  router.get("/admin/current", isAdminAuthenticated, currentAdminUser);
};
