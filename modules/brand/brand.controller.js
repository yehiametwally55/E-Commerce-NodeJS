import slugify from "slugify";
import brandModel from "../../DB/models/brand.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import cloudinary from "../../utilitis/cloudinary.js";
import { deleteOne } from "../../utilitis/handlers/refactor.handler.js";
import ApiFeature from "../../utilitis/APIFeatures.js";

export const getAllBrands = asyncHandler(async(req,res,next) =>{
    let apiFeature = new ApiFeature(brandModel.find(), req.query).pagination().sort().fields().search().filter()
    let brands =  await apiFeature.mongooseQuery
    res.json({message:'Done', brands});
})
export const getBrandsById = asyncHandler(async(req,res,next) =>{
    let {id} = req.params;
    let brands =  await brandModel.findById({id});
    res.json({message:'Done', brands});
})

export const createbrand = asyncHandler(async (req,res,next) =>{
    const {name} = req.body;
    const exist = await brandModel.findOne({name:name.toLowerCase()});
    if(exist){
        return next(new AppError("brand already exist", 400))
    }
    for (const file of req.files) {
        const {secure_url, public_id} = await cloudinary.uploader.upload(file.path,{
            folder:'e-commerce' 
        })
        arrImg.push({secure_url, public_id})
        }
    const brand = await brandModel.insertMany({
        name,
        slug:slugify(name),
        images:arrImg
    })
    res.status(200).json({msg:"done",brand})
})

export const updatebrand = asyncHandler(async (req,res,next) =>{
    const {name} = req.body;
    const {id} = req.params;
    const exist = await brandModel.findOne({_id:id});
    if(!exist){
        return next(new AppError("brand doesn't exist", 400))
    }
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
          folder: `e-commerce`
    })
        const updated = await brandModel.findOneAndUpdate({
            _id: id,
            name, 
            slug:slugify(name),
            image:{ secure_url, public_id },
            new: true
        }
            )
            res.status(201).json({message:"brand updated", updated})
}})

export const deletebrand = deleteOne(brandModel)