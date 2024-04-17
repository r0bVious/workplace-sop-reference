import { Router } from "express";
import {
  deleteComment,
  getComments,
  newComment,
} from "../controllers/comment-controllers.js";
import { commentValidator, validate } from "../utils/validators.js";

const commentsRoutes = Router();
commentsRoutes.get("/", getComments);
commentsRoutes.post("/newcomment", validate(commentValidator), newComment);
commentsRoutes.post("/delete", deleteComment);

export default commentsRoutes;
