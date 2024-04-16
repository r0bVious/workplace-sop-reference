import { Router } from "express";
import {
  deleteComment,
  newComment,
} from "../controllers/comment-controllers.js";
import { commentValidator, validate } from "../utils/validators.js";

const commentsRoutes = Router();
// commentsRoutes.get("/", getAllComments); BEING HANDLED BY ARTICLES ROUTE WITH ARTICLES GET
commentsRoutes.post("/newcomment", validate(commentValidator), newComment);
commentsRoutes.post("/delete", deleteComment);

export default commentsRoutes;
