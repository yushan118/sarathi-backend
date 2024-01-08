import express from "express";
import { isAdminAuthenticated, isAmbulanceAuthenticated } from "../middlewares";
import {
  changeAmbulanceDriverPassword,
  currentAmbulanceUser,
  editAmbulanceDriver,
  getAllAmbulanceDrivers,
  removeAmbulanceDriver,
} from "../controllers/ambulance";

export default (router: express.Router) => {
  router.get(
    "/ambulance/current",
    isAmbulanceAuthenticated,
    currentAmbulanceUser
  );
  router.get(
    "/ambulance/drivers",
    isAdminAuthenticated,
    getAllAmbulanceDrivers
  );
  router.patch("/ambulance/drivers", isAdminAuthenticated, editAmbulanceDriver);
  router.delete(
    "/ambulance/drivers/:id",
    isAdminAuthenticated,
    removeAmbulanceDriver
  );
  router.post("/ambulance/drivers/password", changeAmbulanceDriverPassword);
};
