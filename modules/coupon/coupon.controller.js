import couponModel from "../../DB/models/coupon.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import { deleteOne } from "../../utilitis/handlers/refactor.handler.js";
import ApiFeature from "../../utilitis/APIFeatures.js";
import QRCode from "qrcode";

export const getAllCoupon = asyncHandler(async(req,res,next) =>{
    let apiFeature = new ApiFeature(couponModel.find(), req.query).pagination().sort().fields().search().filter()
    let Coupons =  await apiFeature.mongooseQuery
    let url = await QRCode.toDataURL('I am a pony!')
    res.json({message:'Done', Coupons,url});
})
export const getCouponsById = asyncHandler(async(req,res,next) =>{
    let {id} = req.params;
    let Coupons =  await couponModel.findById({id});
   let url = await QRCode.toDataURL('I am a pony!')
    res.json({message:'Done', Coupons,url});
})

export const createCoupon = asyncHandler(async (req,res,next) =>{
    let results = new couponModel(req.body); 
    let added = await results.save()
    res.status(200).json({msg:"done",added})
})

export const updateCoupon = asyncHandler(async (req,res,next) =>{
    let {id} = req.params;
    let results = await couponModel.findOneAndUpdate({_id:id}, req.body, {new: true});
    !results && next(new AppError("Coupon not found",404));
    results && res.json({message: "Done", results})
})

export const deleteCoupon = deleteOne(couponModel)