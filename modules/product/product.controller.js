import slugify from "slugify";
import productModel from "../../DB/models/product.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import cloudinary from "../../utilitis/cloudinary.js";
import { deleteOne } from "../../utilitis/handlers/refactor.handler.js";
import ApiFeature from "../../utilitis/APIFeatures.js";

export const getAllProducts = asyncHandler(async(req,res,next) =>{
    let apiFeature = new ApiFeature(productModel.find(), req.query).pagination().sort().fields().search().filter()
    let products =  await apiFeature.mongooseQuery
    res.json({message:'Done', page:apiFeature.page , products});
})
export const getProductsById = asyncHandler(async(req,res,next) =>{
    let {id} = req.params;
    let products =  await productModel.findById({id});
    res.json({message:'Done', products});
})

export const createProduct = asyncHandler(async (req,res,next) =>{
    const {name} = req.body;
    req.body.slug = slugify(req.body.name)
    const exist = await productModel.findOne({name:name.toLowerCase()});
    if(exist){
        return next(new AppError("product already exist", 401));
    }
    // if(!req.files){
    //     return next(new AppError("file doesn't exist", 401));
    // }
    // let arrImg = []

    // for (const file of req.files) {
    // const {secure_url, public_id} = await cloudinary.uploader.upload(file.path,{
    //     folder:'e-commerce' 
    // })
    // arrImg.push({secure_url, public_id})
    // }
    let product = new productModel({
       ...req.body
    })
    await product.save()
    res.status(200).json({msg:"done",product})
})

export const updateProduct = asyncHandler(async (req,res,next) =>{
    const {name} = req.body;
    const {id} = req.params;
    const exist = await productModel.findOne({_id:id});
    if(!exist){
        return next(new AppError("product doesn't exist", 400))
    }

    if(exist.name == name.toLowerCase()){
        return next(new AppError("name match with old name", 401))
    }
    if(req.body.name){
        req.body.slug = slugify(name)
    }
    if(await productModel.findOne({name : name.toLowerCase()})){
        return next(new AppError("name already exists", 401));
    }
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
          folder: `e-commerce`
    })
        const updated = await productModel.findByIdAndUpdate(id,{
            ...req.body
        },
        {new:true}
            )
            res.status(201).json({message:"product updated", updated})
}})

export const deleteProduct = deleteOne(productModel)

export const profile = asyncHandler(async (req,res,next) =>{
   res.json({msg:"done", file: req.file})
})