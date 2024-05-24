import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
// Middleware
app.use(cors({
    origin: "https://workplace-info-portal-fe.onrender.com",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// Custom middleware to set SameSite attribute for specific cookies
app.use((req, res, next) => {
    res.set("Set-Cookie", `auth_token=value; SameSite=None; Secure`);
    next();
});
app.use("/infoportal", appRouter);
export default app;
//# sourceMappingURL=app.js.map