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

export async function editUser(
  req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const { id, name, mobile_number } = req.body;
    if (!id || !name || !mobile_number) {
      return res
        .status(400)
        .json({ message: "id, name and mobile_number are required fields" })
        .end();
    }
    await UserModel.findOneAndUpdate({ _id: id }, { name, mobile_number });
    return res.status(200).json({ success: true }).end();
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
