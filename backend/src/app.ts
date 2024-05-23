import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();

const app = express();

//middleware
app.use(
  cors({
    origin: "https://workplace-info-portal-fe.onrender.com:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/infoportal", appRouter);
export default app;
