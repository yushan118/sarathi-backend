import express from "express";
import {
  login,
  loginAdmin,
  loginAmbulance,
  register,
  registerAdmin,
  registerAmbulance,
} from "../controllers/authentication";

// Exporting a function that sets up routes on the provided express.Router instance
export default (router: express.Router) => {

  // Setting up a POST route for "/auth/register"
  // This route is intended for normal user registration
  router.post("/auth/register", register);

  // Setting up a POST route for "/auth/login"
  // This route is intended for normal user login
  router.post("/auth/login", login);

  // Setting up a POST route for "/auth/admin/register"
  // This route is intended for admin user registration
  router.post("/auth/admin/register", registerAdmin);

  // Setting up a POST route for "/auth/admin/login"
  // This route is intended for admin user login
  router.post("/auth/admin/login", loginAdmin);

  // Setting up a POST route for "/auth/ambulance/register"
  // This route is intended for ambulance user registration
  router.post("/auth/ambulance/register", registerAmbulance);

  // Setting up a POST route for "/auth/ambulance/login"
  // This route is intended for ambulance user login
  router.post("/auth/ambulance/login", loginAmbulance);
};
