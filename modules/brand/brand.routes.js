import { Router } from "express";
import * as brandController from "./brand.controller.js"
import { Validation } from "../../middleware/validation.js";
import { UpdateBrandSchema, createBrandSchema } from "./brand.validation.js";
const router = Router();


router.get("/getBrands",brandController.getAllBrands);
router.get("/getBrandById/:id",brandController.getBrandsById)
router.post("/createbrand", Validation(createBrandSchema) ,brandController.createbrand);
router.put("/updatebrand/:id",Validation(UpdateBrandSchema), brandController.updatebrand);
router.delete("/deletebrand/:id", brandController.deletebrand);
export default router;