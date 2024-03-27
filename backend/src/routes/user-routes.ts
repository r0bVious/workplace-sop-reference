import { Router } from "express";
import {
  getAllUsers,
  signUpUser,
  loginUser,
  verifyUser,
  logoutUser,
} from "../controllers/user-controllers.js";
import {
  signUpValidator,
  validate,
  loginValidator,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signUpValidator), signUpUser);
userRoutes.post("/login", validate(loginValidator), loginUser);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, logoutUser);
//need an /edit and /delete route, too

export default userRoutes;
