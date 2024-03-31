import { Router } from "express";
import { getComments, newComment } from "../controllers/comment-controllers.js";
import { commentValidator, validate } from "../utils/validators.js";

const commentsRoutes = Router();
commentsRoutes.get("/", getComments);
commentsRoutes.post("/newcomment", validate(commentValidator), newComment);

export default commentsRoutes;
