import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import userModel from "../../DB/models/user.model.js";

export const signUp = asyncHandler (async (req,res,next) => {
    let isFound = await userModel.findOne({email:req.body.email});
    console.log(isFound);
    if(isFound) {
        next(new AppError("email already exist", 401))
    }
    let user = new userModel(req.body)
    await user.save()
    res.json({message:"added", user})
})

export const signIn = asyncHandler(async(req,res,next) =>{
    let {email, password} = req.body;
    let isFound = await userModel.findOne({email});
    const match = await bcrypt.compare(password, isFound.password);

    if(isFound && match){
        let token = jwt.sign({name: isFound.name, userId: isFound._id, role:isFound.role},process.env.SECRET_KEY);
        return res.json({message:"success",token})
    }
    next(new AppError("incorrect email or Password",401))
});


export const protectRoutes = asyncHandler(async(req,res,next)=>{
    let {token} = req.headers;
    if(!token)return next(new AppError("please provide token", 401))

    let decoded = await jwt.verify(token ,"ecommerce")
    console.log(decoded);

    let user = await userModel.findById(decoded.userId)
    if(!user)return next(new AppError("invalid User",404))
    if(user.changePassAt){
        let changePasswordTime = parseInt(user.changePassAt.getTime()/1000);
        if(changePasswordTime > decoded.iat)return next(new AppError("token invalid",401))
    }
    req.user = user;
    next()
})

export const allowTo = (...roles)=>{
    return asyncHandler((req,res,next)=>{
        if(!roles.includes(req.user.role))return next(new AppError("not Authorized",403));
        
        next()
    })
}