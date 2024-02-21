import express from "express";
import { dashboard } from "../controllers/dashboard";
import { isAdminAuthenticated } from "../middlewares";

// Exporting a function that sets up routes on the provided express.Router instance 
export default (router: express.Router) => {

  // Setting up a GET route for "/dashboard"
  router.get("/dashboard", isAdminAuthenticated, dashboard);
};
