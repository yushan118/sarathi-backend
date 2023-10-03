import express from "express";
import { login, register } from "../controllers/authentication";

export default (router: express.Router, base?: string) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
