import express from "express";
import {
  AuthenticatedAdminRequest,
  AuthenticatedRequest,
} from "../interfaces/request";
import { UserModel } from "../db/users";

export async function currentUser(
  req: AuthenticatedRequest,
  res: express.Response
) {
  try {
    return res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function getAllUsers(
  _req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function removeUser(
  req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required fields" }).end();
    }
    await UserModel.deleteOne({ _id: id });
    return res.status(200).json({ success: true }).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
