import express from "express";
import {
  login,
  loginAdmin,
  register,
  registerAdmin,
} from "../controllers/authentication";

export default (router: express.Router) => {
  // normal user
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  // admin
  router.post("/auth/admin/register", registerAdmin);
  router.post("/auth/admin/login", loginAdmin);
};
