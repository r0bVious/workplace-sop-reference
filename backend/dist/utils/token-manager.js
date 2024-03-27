import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
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
                console.log("Token Verification Successful");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
export { createToken, verifyToken };
//# sourceMappingURL=token-manager.js.map