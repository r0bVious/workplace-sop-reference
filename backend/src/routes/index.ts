import { Router } from "express";
import userRoutes from "./user-routes.js";
import dataRoutes from "./data-routes.js";
import commentsRoutes from "./comments-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes);
appRouter.use("/data", dataRoutes);
appRouter.use("/comments", commentsRoutes);

export default appRouter;
