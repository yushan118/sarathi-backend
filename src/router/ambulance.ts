import express from "express";
import { isAdminAuthenticated, isAmbulanceAuthenticated } from "../middlewares";
import {
  changeAmbulanceDriverPassword,
  currentAmbulanceUser,
  editAmbulanceDriver,
  getAllAmbulanceDrivers,
  removeAmbulanceDriver,
} from "../controllers/ambulance";

// Exporting a function that sets up routes on the provided express.Router instance
export default (router: express.Router) => {

  // Setting up a GET route for "/ambulance/current"
  // This route is intended for retrieving current ambulance user information
  router.get(
    "/ambulance/current",
    isAmbulanceAuthenticated,
    currentAmbulanceUser
  );

  // Setting up a GET route for "/ambulance/drivers"
  // This route is intended for retrieving all ambulance drivers
  router.get(
    "/ambulance/drivers",
    isAdminAuthenticated,
    getAllAmbulanceDrivers
  );

  // Setting up a PATCH route for "/ambulance/drivers"
  // This route is intended for editing (updating) ambulance driver information
  router.patch("/ambulance/drivers", isAdminAuthenticated, editAmbulanceDriver);

  // Setting up a DELETE route for "/ambulance/drivers/:id"
  // This route is intended for removing (deleting) a specific ambulance driver
  router.delete(
    "/ambulance/drivers/:id",
    isAdminAuthenticated,
    removeAmbulanceDriver
  );

  // Setting up a POST route for "/ambulance/drivers/password"
  // This route is likely intended for changing the password of an ambulance driver
  router.post("/ambulance/drivers/password", changeAmbulanceDriverPassword);
};
