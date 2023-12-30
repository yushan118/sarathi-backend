import express from "express";
import { currentUser, getAllUsers, removeUser } from "../controllers/users";
import { isAdminAuthenticated, isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/user/current", isAuthenticated, currentUser);
  router.get("/user/list", isAdminAuthenticated, getAllUsers);
  router.delete("/user/:id", isAdminAuthenticated, removeUser);
};
