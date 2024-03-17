import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
config();

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove in prod
app.use(morgan("dev"));

app.use("/reference-guide/", appRouter);
export default app;
