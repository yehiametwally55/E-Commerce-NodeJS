import slugify from "slugify";
import wishListModel from "../../DB/models/wishList.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import { deleteOne } from "../../utilitis/handlers/refactor.handler.js";
import ApiFeature from "../../utilitis/APIFeatures.js";

export const getAllWishList = asyncHandler(async(req,res,next) =>{
    let results = await userModel.findOne({_id:req.user._id}).populate("wishList");
    !results && next(new AppError("not found",404));
    results && res.json({message:"done", results:results.wishList})
})

export const addToWishList = asyncHandler(async (req,res,next) =>{
     
    let {product}= req.body;
    let results = await userModel.findOneAndUpdate(
        {_id:req.user._id},
        {
            $addToSet:{wishList: product},
    },
    {new:true});
    !results && next(new AppError("not found",404))
    results && res.json({message:"done", results})

})

export const updateWishList = asyncHandler(async (req,res,next) =>{
    let {id} = req.params;
    let results = await userModel.findOneAndUpdate({_id:id , user:req.user._id}, req.body, {new: true});
    !results && next(new AppError("wishList not found",404));
    results && res.json({message: "Done", results})
})

export const deletewishList = asyncHandler(async(req,res,next)=>{
    let {product}= req.body;
    let results = await userModel.findOneAndUpdate(
        {_id:req.user._id},
        {
            $pull:{wishList: product}
    },
    {new:true});
    !results && next(new AppError("not found",404))
    results && res.json({message:"done", results})
})