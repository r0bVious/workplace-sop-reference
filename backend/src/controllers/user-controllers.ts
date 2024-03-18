import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
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

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, position, password, admin_priv } = req.body;
    const checkExistingUser = await User.findOne({ name });
    if (checkExistingUser) return res.status(401).send("User already exists.");
    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      name,
      position,
      password: hashedPassword,
      admin_priv,
    });
    await newUser.save();
    return res.status(201).json({ message: "OK", id: newUser._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, password } = req.body;
    const loggingInUser = await User.findOne({ name });
    if (!loggingInUser) {
      return res.status(401).send("User does not exist.");
    }
    const passwordCheck = await compare(password, loggingInUser.password);
    if (!passwordCheck) {
      return res.status(403).send("Password incorrect.");
    }

    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    const newToken = createToken(
      loggingInUser._id.toString(),
      loggingInUser.name,
      "7d"
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, newToken, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", id: loggingInUser._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

export { getAllUsers, signUpUser, loginUser };
