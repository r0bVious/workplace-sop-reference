import { Router } from "express";
import {
  getAllArticlesWithComments,
  newArticle,
  deleteArticle,
  getArticle,
  editArticle,
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
articleRoutes.get("/article/:id", getArticle);
articleRoutes.post("/delete", deleteArticle);
articleRoutes.post("/edit", editArticle);

export default articleRoutes;
