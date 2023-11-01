
import userModel from "../../DB/models/user.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import ApiFeature from "../../utilitis/APIFeatures.js";

export const getAllUser = asyncHandler(async(req,res,next) =>{
    let apiFeature = new ApiFeature(userModel.find(), req.query).pagination().sort().fields().search().filter()
    let user =  await apiFeature.mongooseQuery
    res.json({message:'Done', page:apiFeature.page , user});
})
export const getUserById = asyncHandler(async(req,res,next) =>{
   let {id} = req.params;
   let results = await userModel.findById(id);
    res.json({message:'Done', results});
})
export const createUser = asyncHandler(async (req,res,next) =>{
    const {email} = req.body;
    const exist = await userModel.findOne({email});
    if(exist){
        return next(new AppError("user already exist", 409));
    }
    let results = new userModel(req.body);
    let added = await results.save()
    res.status(201).json({msg:"done",added})
})

export const updateUser = asyncHandler(async (req,res,next) =>{
    const {name} = req.body;
    const {id} = req.params;
    const exist = await userModel.findOne({_id:id});
    if(!exist){
        return next(new AppError("user doesn't exist", 400))
    }
    if(exist.name == name.toLowerCase()){
        return next(new AppError("name match with old name", 401))
    }
    if(await userModel.findOne({name : name.toLowerCase()})){
        return next(new AppError("name already exists", 401));
    }
    res.status(201).json({message:"user updated", updated})
})

export const changePassword = asyncHandler(async (req,res,next) =>{
    const {id} = req.params;
    req.body.changePassAt = Date.now()
    const exist = await userModel.findOneAndUpdate({_id:id}, req.body, {new:true});
    if(!exist){
        return next(new AppError("user doesn't exist", 400))
    }
    res.status(201).json({message:"user updated", exist})
})
export const deleteUser = asyncHandler(async (req,res,next) =>{
    const {id} = req.params;
    const exist = await userModel.findOne({_id:id});
    if(!exist){
        return next(new AppError("user doesn't exist", 400))
    }
        const deleted = await userModel.findByIdAndRemove({
            _id: id,
        }
            )
         res.status(201).json({message:"user deleted", deleted})
})