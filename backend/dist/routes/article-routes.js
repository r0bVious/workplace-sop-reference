import { Router } from "express";
import { getAllArticlesWithComments, newArticle, deleteArticle, getArticle, editArticle, } from "../controllers/article-controllers.js";
import { articleValidator, validate } from "../utils/validators.js";
import { verifyToken, verifyAdmin } from "../utils/token-manager.js";
const articleRoutes = Router();
articleRoutes.get("/", getAllArticlesWithComments);
articleRoutes.post("/newarticle", verifyToken, validate(articleValidator), newArticle);
articleRoutes.get("/article/:id", getArticle);
articleRoutes.post("/delete", verifyAdmin, deleteArticle);
articleRoutes.post("/edit", verifyAdmin, editArticle);
export default articleRoutes;
//# sourceMappingURL=article-routes.js.map