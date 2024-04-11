import { Router } from "express";
import {
  getAllArticlesWithComments,
  newArticle,
} from "../controllers/article-controllers.js";
import { articleValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const articleRoutes = Router();

articleRoutes.get("/", getAllArticlesWithComments);

//maybe make an admin validator here?
articleRoutes.post(
  "/newarticle",
  verifyToken,
  validate(articleValidator),
  newArticle
);

export default articleRoutes;
