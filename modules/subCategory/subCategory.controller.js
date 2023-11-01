import slugify from "slugify";
import subCategoryModel from "../../DB/models/subCategory.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import cloudinary from "../../utilitis/cloudinary.js";
import ApiFeature from "../../utilitis/APIFeatures.js";

export const getAllSubCategory = asyncHandler(async (req,res,next) =>{
    let apiFeature = new ApiFeature(subCategoryModel.find(), req.query).pagination().sort().fields().search().filter()
    let results =  await apiFeature.mongooseQuery
    res.json({message:"done", page:apiFeature.page, results})
})
export const getSubCategoryById = asyncHandler(async (req,res,next) =>{
    const {id} = req.params;
    let results = await subCategoryModel.findById(id);
    res.json({message:'Done', results});
})

export const createSubCategory = asyncHandler(async (req,res,next) =>{
    const {name , categoryId} = req.body;
    const exist = await subCategoryModel.findOne({name:name.toLowerCase()});
    if(exist){
        return next(new AppError("Subcategory already exist", 400))
    }
    // if(req.file){
    //     exist.image = req.file.path
    // }
    // for (const file of req.files) {
    //     const {secure_url, public_id} = await cloudinary.uploader.upload(file.path,{
    //         folder:'e-commerce' 
    //     })
    //     arrImg.push({secure_url, public_id})
    //     }
    const subCategory = await subCategoryModel.insertMany({
        name,
        slug:slugify(name),
        categoryId
        // images: arrImg
    })
    res.status(201).json({msg:"done",subCategory})
})

export const updateSubCategory = asyncHandler(async (req,res,next) =>{
    const {name} = req.body;
    const {id} = req.params;
    const exist = await subCategoryModel.findOne({_id:id});
    if(!exist){
        return next(new AppError("Subcategory doesn't exist", 400))
    }
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
          folder: `e-commerce`
    })
        const updated = await subCategoryModel.findOneAndUpdate({
            _id: id,
            name, 
            slug:slugify(name),
            image:{ secure_url, public_id },
            new: true
        }
            )
            res.status(201).json({message:"Subcategory updated", updated})
}})
export const deleteSubCategory = asyncHandler(async (req,res,next) =>{
    const {id} = req.params;
    const exist = await subCategoryModel.findOne({_id:id});
    if(!exist){
        return next(new AppError("Subcategory doesn't exist", 400))
    }
        const deleted = await subCategoryModel.findByIdAndRemove({
            _id: id,
        }
            )
            res.status(201).json({message:"Subcategory deleted", deleted})
})

