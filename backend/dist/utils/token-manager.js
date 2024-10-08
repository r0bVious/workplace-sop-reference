import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import User from "../models/User.js";
const createToken = (id, name, expiresIn) => {
    const userPayload = { id, name };
    const userToken = jwt.sign(userPayload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return userToken;
};
const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[COOKIE_NAME];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "No Token Found" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
const verifyAdmin = async (req, res, next) => {
    const token = req.signedCookies[COOKIE_NAME];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "No Token Found" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const user = await User.findById(userId);
        if (!user || !user.adminPriv) {
            return res
                .status(403)
                .json({ message: "You are not authorized to perform this action" });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Token Expired or Invalid" });
    }
};
export { createToken, verifyToken, verifyAdmin };
//# sourceMappingURL=token-manager.js.map