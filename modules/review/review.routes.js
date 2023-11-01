import { Router } from "express";
import * as reviewController from "./review.controller.js"
import { protectRoutes } from "../auth/auth.controller.js";
const ReviewRouter = Router();


ReviewRouter.get("/getReviews", protectRoutes,reviewController.getAllReview);
ReviewRouter.get("/getReviewById/:id",reviewController.getReviewsById)
ReviewRouter.post("/createReview", protectRoutes ,reviewController.createReview);
ReviewRouter.post("/updateReview", protectRoutes ,reviewController.updateReview);
export default ReviewRouter;