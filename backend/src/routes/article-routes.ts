import { Router } from "express";
import {
  getAllArticles,
  newArticle,
} from "../controllers/article-controllers.js";
import { articleValidator, validate } from "../utils/validators.js";

const articleRoutes = Router();

articleRoutes.get("/", getAllArticles);
articleRoutes.post("/newarticle", validate(articleValidator), newArticle);

export default articleRoutes;
