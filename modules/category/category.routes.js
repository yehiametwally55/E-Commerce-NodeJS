import { Router } from "express";
import {auth} from "../../middleware/auth.js"
import * as categoryController from "./category.controller.js"
import { allowedValidation, multerFun } from "../../utilitis/multerLocal.js";
import { multerCloudinary } from "../../utilitis/multerCloud.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import { Validation } from "../../middleware/validation.js";
import { createCategorySchema, getCategoryByIdSchema } from "./category.validation.js";
const router = Router();
router.use('/:id/subCategory', subCategoryRouter)

router.post( "/createCategory", Validation(createCategorySchema),
//multerCloudinary(allowedValidation.image).array("images",2) ,
categoryController.createCategory);
router.get("/getById/:id", Validation(getCategoryByIdSchema), categoryController.getCategoryById)
router.get("/getAll",categoryController.getAllCategories)
router.post("/profile",multerFun(allowedValidation.image , "/user/cover").single("image") , categoryController.profile);
router.put("/updateCategory/:id",multerFun(allowedValidation.image).single("image") , categoryController.updateCategory);
router.delete("/deleteCategory/:id", categoryController.deleteCategory);
export default router;