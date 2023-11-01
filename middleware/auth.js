import jwt from "jsonwebtoken";
import { AppError } from "../utilitis/globalError.js";
import {asyncHandler} from "../utilitis/globalError.js"

export const auth = ()=>{
    return asyncHandler ( async(req,res,next)=>{
        const {auth} = req.headers;
        if(!auth){
            res.status(400).json({message:"please enter token in headers"});
        }
        console.log(auth);
    
        const token = auth;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded?.id){
            return res.status(400).json({message:"invalid token"})
        }
        const user = await userModel.findById(decoded.id);
        if(!user || user.isDeleted == true || user.isLoggedIn == false){
            return res.status(400).json({message:"invalid user"})
        }
        req.user = user;
        next();
        console.log(user);
        
    })
    }