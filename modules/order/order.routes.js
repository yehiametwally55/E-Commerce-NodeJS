import { Router } from "express";
import * as orderController from "./order.controller.js"
import { protectRoutes } from "../auth/auth.controller.js";
const orderRouter = Router();

orderRouter.post("/:id", protectRoutes,orderController.createCashOrder)
orderRouter.get("/", protectRoutes,orderController.getOrder)
orderRouter.post("/checkout/:id", protectRoutes,orderController.onlinePayment)
// cartRouter.delete("/:id", protectRoutes,cartController.deleteCartItem)
// cartRouter.put("/", protectRoutes,cartController.updateCart)
export default orderRouter;