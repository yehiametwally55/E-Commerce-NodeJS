import slugify from "slugify";
import reviewModel from "../../DB/models/review.model.js";
import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import { deleteOne } from "../../utilitis/handlers/refactor.handler.js";
import ApiFeature from "../../utilitis/APIFeatures.js";
import cartModel from "../../DB/models/cart.model.js";
import productModel from "../../DB/models/product.model.js";
import couponModel from "../../DB/models/coupon.model.js"

function calcPrice(cart){
    let totalPrice = 0;
    cart.cartItems.forEach((ele) => {
     totalPrice += ele.quantity * ele.price
    });
    cart.totalPrice = totalPrice
}

export const getCart = asyncHandler(async(req,res,next) =>{
    let cart = await cartModel.findOne({user: req.user._id})

    res.json({message:"done",cart})
})

export const createCart = asyncHandler(async (req,res,next) =>{
    let product = await productModel.findById(req.body.product).select("price")
    !product && next(new AppError("product not found",404))
    req.body.price = product.price
   let isCartExist = await cartModel.findOne({user: req.user._id})
   if(!isCartExist){
    let cart = new cartModel({
        user : req.user._id,
        cartItems: [req.body]
    });
    
    calcPrice(cart)
    await cart.save();
    return res.status(201).json({message:"created", cart})
   }
   let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product)
   if(item){
    item.quantity += 1;
   }else{
    isCartExist.cartItems.push(req.body)
   }

  calcPrice(isCartExist)
   await isCartExist.save()
    res.json({message:"ay7aga",isCartExist})
})

export const deleteCartItem = asyncHandler(async(req,res,next) =>{
    let cart = await cartModel.findOneAndUpdate({user: req.user._id}, {
        $pull:{cartItems: {_id: req.params.id}}
    }, {new:true})
    res.json({message:"deleted",cart})
})

export const updateCart = asyncHandler(async (req,res,next) =>{
    let product = await productModel.findById(req.body.product).select("price")
    !product && next(new AppError("product not found",404))
    req.body.price = product.price
   let isCartExist = await cartModel.findOne({user: req.user._id})
   let item = isCartExist.cartItems.find((ele) => ele.product == req.body.product)
    !item && next(new AppError("not found",404))
   if(item){
    item.quantity = req.body.quantity;
   }

  calcPrice(isCartExist)
   await isCartExist.save()
    res.json({message:"ay7aga",isCartExist})
})

export const applyCoupon = asyncHandler(async (req,res,next) =>{
    let code =  await couponModel.findOne({code: req.params.code});
    let cart = await cartModel.findOne({user: req.user._id});
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.discount)/100;
    await cart.save();
    res.json({message:"done", cart})
})