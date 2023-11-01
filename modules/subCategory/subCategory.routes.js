import { Router } from "express";
import * as subCategoryController from "./subCategory.controller.js"
const subCategoryRouter = Router({mergeParams: true});

subCategoryRouter.post("/createSubCategory", subCategoryController.createSubCategory);
subCategoryRouter.put("/updateSubCategory/:id", subCategoryController.updateSubCategory);
subCategoryRouter.delete("/deleteSubCategory/:id", subCategoryController.deleteSubCategory);
subCategoryRouter.get("/getAllSubCategory", subCategoryController.getAllSubCategory);
subCategoryRouter.get("/getSubCategoryById/:id", subCategoryController.getSubCategoryById);
export default subCategoryRouter;