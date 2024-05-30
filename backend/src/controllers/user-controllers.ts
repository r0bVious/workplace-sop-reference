import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, position, password, adminPriv } = req.body;
    const checkExistingUser = await User.findOne({ username });
    if (checkExistingUser) return res.status(401).send("User already exists.");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      position,
      password: hashedPassword,
      adminPriv,
    });
    await newUser.save();
    return res.status(201).json({
      message: "OK",
      username: newUser.username,
      position: newUser.position,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.body;
    const existingUser = await User.findOne({ _id });
    if (!existingUser) return res.status(401).send("User doesn't exist.");
    await existingUser.deleteOne();
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggingInUser = await User.findById(res.locals.jwtData.id);
    if (!loggingInUser) {
      return res.status(401).send("User does not exist OR token error");
    }
    if (loggingInUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions mismatch");
    }
    return res.status(200).json({
      message: "OK",
      username: loggingInUser.username,
      adminPriv: loggingInUser.adminPriv,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const loggingInUser = await User.findOne({ username });
    if (!loggingInUser) {
      return res.status(401).send("User does not exist.");
    }
    const passwordCheck = await bcrypt.compare(
      password,
      loggingInUser.password
    );
    if (!passwordCheck) {
      return res.status(403).send("Password incorrect.");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
    });

    const newToken = createToken(
      loggingInUser._id.toString(),
      loggingInUser.username,
      "7d"
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // res.cookie(COOKIE_NAME, newToken, {
    //   path: "/",
    //   expires,
    //   httpOnly: true,
    //   signed: true,
    //   secure: true,
    //   sameSite: "none",
    // });

    return res.status(200).json({
      message: "OK",
      username: loggingInUser.username,
      adminPriv: loggingInUser.adminPriv,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggingOutUser = await User.findById(res.locals.jwtData.id);
    if (!loggingOutUser) {
      return res.status(401).send("User does not exist OR token error");
    }
    if (loggingOutUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions mismatch");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", username: loggingOutUser.username });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

export {
  getAllUsers,
  createUser,
  loginUser,
  verifyUser,
  logoutUser,
  deleteUser,
};
