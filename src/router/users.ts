import express from "express";
import { currentUser } from "../controllers/users";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/user/current", isAuthenticated, currentUser);
};
