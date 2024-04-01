import { Router } from "express";
import { getAllArticles, newArticle, } from "../controllers/article-controllers.js";
import { articleValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const articleRoutes = Router();
articleRoutes.get("/", getAllArticles);
articleRoutes.post("/newarticle", verifyToken, validate(articleValidator), newArticle);
export default articleRoutes;
//# sourceMappingURL=article-routes.js.map