import express from "express";
import { currentAdminUser } from "../controllers/admin";
import { isAdminAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/admin/current", isAdminAuthenticated, currentAdminUser);
};
