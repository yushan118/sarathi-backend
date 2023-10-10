import { authentication, randomSalt } from "../shared";
import { UserModel } from "../db/users";
import express from "express";
import { AdminUserModel } from "../db/admin";

export async function login(req: express.Request, res: express.Response) {
  try {
    const { mobile_number, password } = req.body;

    if (!mobile_number || !password) {
      return res
        .status(400)
        .json({ message: "mobile_number and password are required fields" })
        .end();
    }

    const user = await UserModel.findOne({ mobile_number }).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number or password" });
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password != expectedHash) {
      return res
        .status(403)
        .json({ message: "Invalid mobile number or password" });
    }

    const salt = randomSalt();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    return res.status(200).json({
      user: user,
      type: "user",
      access_token: user.authentication.sessionToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" }).end();
  }
}

export async function register(req: express.Request, res: express.Response) {
  try {
    const { mobile_number, password, name } = req.body;
    if (!mobile_number || !password || !name) {
      return res
        .status(400)
        .json({
          message: "mobile_number, password and name are required fields",
        })
        .end();
    }

    const existingUser = await UserModel.findOne({ mobile_number });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User already exists",
        })
        .end();
    }

    const salt = randomSalt();
    const user = await new UserModel({
      mobile_number,
      name,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    })
      .save()
      .then((user) => user.toObject());

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" }).end();
  }
}

export async function loginAdmin(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required fields" })
        .end();
    }

    const adminUser = await AdminUserModel.findOne({ email }).select(
      "+authentication.salt +authentication.password"
    );
    if (!adminUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const expectedHash = authentication(
      adminUser.authentication.salt,
      password
    );
    if (adminUser.authentication.password != expectedHash) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const salt = randomSalt();
    adminUser.authentication.sessionToken = authentication(
      salt,
      adminUser._id.toString()
    );
    await adminUser.save();

    return res.status(200).json({
      user: adminUser,
      type: "admin",
      access_token: adminUser.authentication.sessionToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" }).end();
  }
}

export async function registerAdmin(
  req: express.Request,
  res: express.Response
) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({
          message: "mobile_number, password and name are required fields",
        })
        .end();
    }

    const existingAdminUser = await AdminUserModel.findOne({ email });
    if (existingAdminUser) {
      return res
        .status(400)
        .json({
          message: "User already exists",
        })
        .end();
    }

    const salt = randomSalt();
    const adminUser = await new AdminUserModel({
      email,
      name,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    })
      .save()
      .then((user) => user.toObject());

    return res.status(200).json(adminUser).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" }).end();
  }
}
