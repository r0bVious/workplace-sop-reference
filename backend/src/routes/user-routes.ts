import { Router } from "express";
import {
  getAllUsers,
  createUser,
  loginUser,
  verifyUser,
  logoutUser,
  deleteUser,
} from "../controllers/user-controllers.js";
import {
  createUserValidator,
  validate,
  loginValidator,
} from "../utils/validators.js";
import { verifyToken, verifyAdmin } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", verifyAdmin, getAllUsers);
userRoutes.post(
  "/create",
  validate(createUserValidator),
  verifyAdmin,
  createUser
); // admin check middleware?
userRoutes.post("/delete", verifyAdmin, deleteUser); // admin check middleware?
userRoutes.post("/login", validate(loginValidator), loginUser);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, logoutUser);

export default userRoutes;
