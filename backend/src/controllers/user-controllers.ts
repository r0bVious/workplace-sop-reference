import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { hash, compare } from "bcrypt";

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
    const existingUser = await User.findOne({ name });
    if (!existingUser) {
      return res.status(401).send("User does not exist.");
    }
    const passwordCheck = await compare(password, existingUser.password);
    if (!passwordCheck) {
      return res.status(403).send("Password incorrect.");
    }
    return res
      .status(200)
      .json({ message: "OK", id: existingUser._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

export { getAllUsers, signUpUser, loginUser };
