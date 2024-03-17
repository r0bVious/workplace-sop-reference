import jwt from "jsonwebtoken";

const createToken = (id: string, name: string, expiresIn: string) => {
  const userPayload = { id, name };
  const userToken = jwt.sign(userPayload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return userToken;
};

export { createToken };
