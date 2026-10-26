import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/user.controller.js";

export const authRoutes = express.Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
