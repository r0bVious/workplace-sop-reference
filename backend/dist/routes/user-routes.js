import { Router } from "express";
import { getAllUsers, signUpUser, loginUser, } from "../controllers/user-controllers.js";
import { signUpValidator, validate, loginValidator, } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signUpValidator), signUpUser);
userRoutes.post("/login", validate(loginValidator), loginUser);
//need an /edit and /delete route, too
export default userRoutes;
//# sourceMappingURL=user-routes.js.map