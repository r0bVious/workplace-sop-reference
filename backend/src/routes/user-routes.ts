import { Router } from "express";
import { getAllUsers, signUpUser } from "../controllers/user-controllers.js";
import { signUpValidator, validate } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signUpValidator), signUpUser);
//need an /edit and /delete route, too

export default userRoutes;
