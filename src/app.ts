import express from "express"
import { authRoutes } from "./route/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.json())
app.use("/api/v1/auth", authRoutes);
app.use(errorMiddleware);