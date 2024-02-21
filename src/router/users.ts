import express from "express";
import {
  currentUser,
  getAllUsers,
  editUser,
  suspendUser,
  userDetails,
} from "../controllers/users";
import { isAdminAuthenticated, isAuthenticated } from "../middlewares";

// Exporting a function that sets up routes on the provided express.Router instance
export default (router: express.Router) => {
  router.get("/user/current", isAuthenticated, currentUser);     // Route for getting the details of the currently authenticated user
  router.get("/user/list", isAdminAuthenticated, getAllUsers);    // Route for getting a list of all users (requires admin authentication)
  router.patch("/user/list", isAdminAuthenticated, editUser);    // Route for editing user details (requires admin authentication)
  router.post("/user/:id", isAdminAuthenticated, suspendUser);    // Route for suspending a user by their ID (requires admin authentication)
  router.get("/user/details/:mobile_number", userDetails);      // Route for getting details of a user by their mobile number
};
