import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
const createUser = async (req, res, next) => {
    try {
        const { username, position, password, adminPriv } = req.body;
        const checkExistingUser = await User.findOne({ username });
        if (checkExistingUser)
            return res.status(401).send("User already exists.");
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
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
const deleteUser = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const existingUser = await User.findOne({ _id });
        if (!existingUser)
            return res.status(401).send("User doesn't exist.");
        await existingUser.deleteOne();
        return res.status(200).json({
            message: "OK",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
const verifyUser = async (req, res, next) => {
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
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
const myDomain = "workplace-info-portal-be.onrender.com";
// const myDomain = "localhost";
const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const loggingInUser = await User.findOne({ username });
        if (!loggingInUser) {
            return res.status(401).send("User does not exist.");
        }
        const passwordCheck = await bcrypt.compare(password, loggingInUser.password);
        if (!passwordCheck) {
            return res.status(403).send("Password incorrect.");
        }
        const newToken = createToken(loggingInUser._id.toString(), loggingInUser.username, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, newToken, {
            domain: myDomain,
            path: "/",
            expires,
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).json({
            message: "OK",
            username: loggingInUser.username,
            adminPriv: loggingInUser.adminPriv,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
const logoutUser = async (req, res, next) => {
    try {
        const loggingOutUser = await User.findById(res.locals.jwtData.id);
        if (!loggingOutUser) {
            return res.status(401).send("User does not exist OR token error");
        }
        if (loggingOutUser._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions mismatch");
        }
        res.clearCookie(COOKIE_NAME, {
            domain: myDomain,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res
            .status(200)
            .json({ message: "OK", username: loggingOutUser.username });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
export { getAllUsers, createUser, loginUser, verifyUser, logoutUser, deleteUser, };
//# sourceMappingURL=user-controllers.js.map