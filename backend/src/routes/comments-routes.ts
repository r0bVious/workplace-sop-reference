import { Router } from "express";
import {
  deleteComment,
  getComments,
  newComment,
} from "../controllers/comment-controllers.js";
import { commentValidator, validate } from "../utils/validators.js";
import { verifyAdmin } from "../utils/token-manager.js";

const commentsRoutes = Router();
commentsRoutes.get("/", getComments);
commentsRoutes.post("/newcomment", validate(commentValidator), newComment);
commentsRoutes.post("/delete", verifyAdmin, deleteComment);

export default commentsRoutes;
