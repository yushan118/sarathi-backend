import express from "express";
import {
  login,
  loginAdmin,
  loginAmbulance,
  register,
  registerAdmin,
  registerAmbulance,
} from "../controllers/authentication";

export default (router: express.Router) => {
  // normal user
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  // admin
  router.post("/auth/admin/register", registerAdmin);
  router.post("/auth/admin/login", loginAdmin);
  // ambulance
  router.post("/auth/ambulance/register", registerAmbulance);
  router.post("/auth/ambulance/login", loginAmbulance);
};
