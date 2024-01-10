import express from "express";
import {
  AuthenticatedAdminRequest,
  AuthenticatedRequest,
} from "../interfaces/request";
import { UserModel } from "../db/users";
import { BookingModel } from "db/booking";

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

export async function suspendUser(
  req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const { action } = req.body;
    if (!id || !action) {
      return res
        .status(400)
        .json({ message: "id and action required fields" })
        .end();
    }
    const toSuspend = action == "suspend";
    await UserModel.findOneAndUpdate({ _id: id }, { is_suspended: toSuspend });
    return res.status(200).json({ success: true }).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function userDetails(req: express.Request, res: express.Response) {
  try {
    const { mobile_number } = req.params;
    const user = await UserModel.find({ mobile_number });
    if (user.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user[0]).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
