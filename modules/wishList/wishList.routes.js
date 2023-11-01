import { Router } from "express";
import * as wishList from "./wishList.controller.js"
import { protectRoutes } from "../auth/auth.controller.js";
const wishListRouter = Router();

wishListRouter.patch("/:id", protectRoutes,wishList.addToWishList)

export default wishListRouter;