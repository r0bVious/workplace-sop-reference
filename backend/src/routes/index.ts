import { Router } from "express";
import userRoutes from "./user-routes.js";
import articleRoutes from "./article-routes.js";
import commentsRoutes from "./comments-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes);
appRouter.use("/articles", articleRoutes);
appRouter.use("/comments", commentsRoutes);

export default appRouter;
