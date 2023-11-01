import { Router } from "express";
import * as couponController from "./coupon.controller.js"
import { protectRoutes } from "../auth/auth.controller.js";
const CouponRouter = Router();


CouponRouter.get("/getCoupons", protectRoutes,couponController.getAllCoupon);
CouponRouter.get("/getCouponsById/:id",couponController.getCouponsById)
CouponRouter.post("/createCoupons", protectRoutes ,couponController.createCoupon);
CouponRouter.post("/updateCoupons", protectRoutes ,couponController.updateCoupon);
export default CouponRouter;