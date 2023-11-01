import express from "express";
const app = express();
import { config } from "dotenv";
config();
const Port = process.env.PORT || 3000;
import {dbConnection} from './DB/dbConnection.js';
import * as allRoutes from "./modules/index.routes.js"
import { globalErrorHandle,AppError } from "./utilitis/globalError.js";
import cors from "cors"
app.use(express.static("uploads"))
app.use(express.json());
app.use(cors())

app.use("/category", allRoutes.categoryRoutes);
app.use("/subcategory", allRoutes.subCategoryRoutes);
app.use("/brand", allRoutes.brandRoutes);
app.use("/product", allRoutes.productRouter);
app.use("/user", allRoutes.userRoutes);
app.use("/auth", allRoutes.authRoutes);
app.use("/review",allRoutes.ReviewRouter)
app.use("/coupon",allRoutes.CouponRouter)
app.use("/cart",allRoutes.cartRouter)
app.use("/order",allRoutes.orderRouter)
app.use("*",(req,res,next) =>{
    next(new AppError(`invalid routing ${req.originalUrl}`, 404))
})

//global error Handling
app.use(globalErrorHandle)



dbConnection()
app.listen(Port, () =>{
    console.log(`Server listening on port ${Port}`);
})