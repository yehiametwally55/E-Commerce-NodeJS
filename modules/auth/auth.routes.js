import { Router } from "express";
import * as authController from "./auth.controller.js"

const authRoutes = Router();

authRoutes.post( "/signUp",authController.signUp);
authRoutes.post("/signIn", authController.signIn);
export default authRoutes;