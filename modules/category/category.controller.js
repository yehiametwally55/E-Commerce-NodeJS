import slugify from "slugify";
import categoryModel from "../../DB/models/category.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import cloudinary from "../../utilitis/cloudinary.js";
import ApiFeature from "../../utilitis/APIFeatures.js";


export const getAllCategories = asyncHandler(async(req,res,next) =>{
    let apiFeature = new ApiFeature(categoryModel.find(), req.query).pagination().sort().fields().search().filter()
    let category =  await apiFeature.mongooseQuery
    res.json({message:'Done', page:apiFeature.page , category});
})
export const getCategoryById = asyncHandler(async(req,res,next) =>{
   let {id} = req.params;
   let results = await categoryModel.findById(id);
    res.json({message:'Done', results});
})
export const createCategory = asyncHandler(async (req,res,next) =>{
    const {name} = req.body;
    const exist = await categoryModel.findOne({name:name.toLowerCase()});
    if(exist){
        return next(new AppError("category already exist", 400));
    }
    // if(!req.files){
    //     return next(new AppError("file doesn't exist", 401));
    // }
    let arrImg = []
    // for (const file of req.files) {
    // const {secure_url, public_id} = await cloudinary.uploader.upload(file.path,{
    //     folder:'e-commerce' 
    // })
    // arrImg.push({secure_url, public_id})
    // }
    const category = await categoryModel.insertMany({
        name,
        slug:slugify(name),
        images: arrImg
    })
    res.status(201).json({msg:"done",category})
})

export const updateCategory = asyncHandler(async (req,res,next) =>{
    const {name} = req.body;
    const {id} = req.params;
    const exist = await categoryModel.findOne({_id:id});
    if(!exist){
        return next(new AppError("category doesn't exist", 400))
    }
    if(exist.name == name.toLowerCase()){
        return next(new AppError("name match with old name", 401))
    }
    if(await categoryModel.findOne({name : name.toLowerCase()})){
        return next(new AppError("name already exists", 401));
    }
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
          folder: `e-commerce`
    })
        const updated = await categoryModel.findOneAndUpdate({
            _id: id,
            name, 
            slug:slugify(name),
            images: { secure_url, public_id },
            new: true
        }
            )
            res.status(201).json({message:"Category updated", updated})
}})

export const deleteCategory = asyncHandler(async (req,res,next) =>{
    const {id} = req.params;
    const exist = await categoryModel.findOne({_id:id});
    if(!exist){
        return next(new AppError("category doesn't exist", 400))
    }
        const deleted = await categoryModel.findByIdAndRemove({
            _id: id,
        }
            )
            res.status(201).json({message:"Category deleted", deleted})
})

export const profile = asyncHandler(async (req,res,next) =>{
   res.json({msg:"done", file: req.file})
})