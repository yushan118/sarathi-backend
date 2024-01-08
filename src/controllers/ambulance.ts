import { AmbulanceUserModel } from "../db/ambulance-user";
import express from "express";
import {
  AuthenticatedAdminRequest,
  AuthenticatedAmbulanceRequest,
} from "../interfaces/request";
import { authentication, randomSalt } from "../shared";

export async function currentAmbulanceUser(
  req: AuthenticatedAmbulanceRequest,
  res: express.Response
) {
  try {
    return res.json(req.ambulance_user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function getAllAmbulanceDrivers(
  _req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const drivers = await AmbulanceUserModel.find();
    return res.status(200).json(drivers).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function editAmbulanceDriver(
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
    await AmbulanceUserModel.findOneAndUpdate(
      { _id: id },
      { name, mobile_number }
    );
    return res.status(200).json({ success: true }).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function removeAmbulanceDriver(
  req: AuthenticatedAdminRequest,
  res: express.Response
) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required fields" }).end();
    }
    await AmbulanceUserModel.deleteOne({ _id: id });
    return res.status(200).json({ success: true }).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function changeAmbulanceDriverPassword(
  req: express.Request,
  res: express.Response
) {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "phone and password are required fields" })
        .end();
    }

    const salt = randomSalt();
    await AmbulanceUserModel.findOneAndUpdate(
      { mobile_number: phone },
      {
        "authentication.salt": salt,
        "authentication.password": authentication(salt, password),
      }
    );
    return res.status(200).json({ success: true }).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}
