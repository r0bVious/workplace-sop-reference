import { Router } from "express";
import { getArticle, newArticle } from "../controllers/article-controllers.js";
import { articleValidator, validate } from "../utils/validators.js";
const articleRoutes = Router();
articleRoutes.get("/" /*WHAT DO*/);
articleRoutes.get("/article", getArticle);
articleRoutes.post("/newarticle", validate(articleValidator), newArticle);
export default articleRoutes;
//# sourceMappingURL=article-routes.js.map