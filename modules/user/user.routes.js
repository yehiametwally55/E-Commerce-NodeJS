import { Router } from "express";
import * as userController from "./user.controller.js"

const userRoutes = Router();

userRoutes.post( "/createUSer",userController.createUser);
userRoutes.get("/getById/:id", userController.getUserById)
userRoutes.get("/getAll",userController.getAllUser)
userRoutes.put("/updateUser/:id" , userController.updateUser);
userRoutes.delete("/deleteUser/:id", userController.deleteUser);
userRoutes.patch("/changePassword/:id", userController.changePassword);
export default userRoutes;