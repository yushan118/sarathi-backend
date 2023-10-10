import express from "express";
import { dashboard } from "../controllers/dashboard";
import { isAdminAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/dashboard", isAdminAuthenticated, dashboard);
};
