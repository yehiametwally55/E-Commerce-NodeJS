import slugify from "slugify";
import reviewModel from "../../DB/models/review.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import { deleteOne } from "../../utilitis/handlers/refactor.handler.js";
import ApiFeature from "../../utilitis/APIFeatures.js";

export const getAllReview = asyncHandler(async(req,res,next) =>{
    let apiFeature = new ApiFeature(reviewModel.find(), req.query).pagination().sort().fields().search().filter()
    let reviews =  await apiFeature.mongooseQuery
    res.json({message:'Done', reviews});
})
export const getReviewsById = asyncHandler(async(req,res,next) =>{
    let {id} = req.params;
    let reviews =  await reviewModel.findById({id});
    res.json({message:'Done', reviews});
})

export const createReview = asyncHandler(async (req,res,next) =>{
    console.log(req.body.user);
    req.body.user = req.user._id; 
    console.log(req.body.user);
    let isReview = await reviewModel.findOne({user: req.user._id, product: req.body.product})
    if(isReview) return next(new AppError("already have review", 409))
    let results = new reviewModel(req.body); 
    let added = await results.save()
    res.status(200).json({msg:"done",added})
})

export const updateReview = asyncHandler(async (req,res,next) =>{
    let {id} = req.params;
    let results = await reviewModel.findOneAndUpdate({_id:id , user:req.user._id}, req.body, {new: true});
    !results && next(new AppError("review not found",404));
    results && res.json({message: "Done", results})
})

export const deletRreview = deleteOne(reviewModel)