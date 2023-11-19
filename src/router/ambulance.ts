import express from "express";
import { isAmbulanceAuthenticated } from "../middlewares";
import { currentAmbulanceUser } from "../controllers/ambulance";

export default (router: express.Router) => {
  router.get(
    "/ambulance/current",
    isAmbulanceAuthenticated,
    currentAmbulanceUser
  );
};
