import { Router } from "express";
import { newComment } from "../controllers/comment-controllers.js";
import { commentValidator, validate } from "../utils/validators.js";
const commentsRoutes = Router();
// commentsRoutes.get("/", getAllComments); BEING HANDLED BY ARTICLES ROUTE WITH ARTICLES GET
commentsRoutes.post("/newcomment", validate(commentValidator), newComment);
export default commentsRoutes;
//# sourceMappingURL=comments-routes.js.map