import jwt from "jsonwebtoken";
const createToken = (id, name, expiresIn) => {
    const userPayload = { id, name };
    const userToken = jwt.sign(userPayload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return userToken;
};
export { createToken };
//# sourceMappingURL=token-manager.js.map