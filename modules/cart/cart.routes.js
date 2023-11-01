import { Router } from "express";
import * as cartController from "./cart.controller.js"
import { protectRoutes } from "../auth/auth.controller.js";
const cartRouter = Router();

cartRouter.post("/", protectRoutes,cartController.createCart)
cartRouter.get("/", protectRoutes,cartController.getCart)
cartRouter.delete("/:id", protectRoutes,cartController.deleteCartItem)
cartRouter.put("/", protectRoutes,cartController.updateCart)
export default cartRouter;