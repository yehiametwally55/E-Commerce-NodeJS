import { Router } from "express";
import * as productController from "./product.controller.js"
import { allowedValidation, multerFun } from "../../utilitis/multerLocal.js";
import { multerCloudinary } from "../../utilitis/multerCloud.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
const productRouter = Router();
 


productRouter.get("/getAll", productController.getAllProducts);
productRouter.get("/getById/:id", productController.getProductsById)
productRouter.post("/createProduct", protectRoutes,
//multerCloudinary(allowedValidation.image).array("images",2) ,
productController.createProduct);
//productRouter.post("/profile",multerFun(allowedValidation.image , "/user/cover").single("image") , categoryController.profile);
productRouter.put("/updateProduct/:id",multerFun(allowedValidation.image).single("image") , productController.updateProduct);
productRouter.delete("/deleteProduct/:id", productController.deleteProduct);

export default productRouter;