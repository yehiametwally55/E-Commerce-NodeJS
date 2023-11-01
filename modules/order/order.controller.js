import { AppError, asyncHandler } from "../../utilitis/globalError.js";
import { deleteOne } from "../../utilitis/handlers/refactor.handler.js";
import ApiFeature from "../../utilitis/APIFeatures.js";
import cartModel from "../../DB/models/cart.model.js";
import productModel from "../../DB/models/product.model.js";
import couponModel from "../../DB/models/coupon.model.js"
import orderModel from "../../DB/models/order.model.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NwjTOBiQVkg1QT03o5ZcIRVsn9f5JHI4ONwjsBp5xnoFLZzf2AaGUCyzWWQJg3lVVXiXO3wyZaakj6VDJTVTS5P00PWYcXu6l');
export const createCashOrder = async (req,res,next) =>{
   let cart = await cartModel.findById(req.params.id);
   let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
   let order = new orderModel({
    user: req.user._id,
    cartItems : cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress
   });

   if(order){
     let options =  cart.cartItems.map(ele => ({
        updateOne:{
            filter: {_id: ele.product},
            update: {$inc: {quantity: -ele.quantity, soldItems: ele.quantity}}
        },
     }));
    await productModel.bulkWrite(options);
    await order.save()
   } else {
    return next(new AppError("error occured", 409));
    
   }
   await cartModel.findByIdAndDelete(req.params.id);
   res.json({message:"done", order})
}

export const getOrder = async(req,res,next) => {
    let order = await orderModel.findOne({user: req.user._id});
    res.json({message:"done", order})
}

export const onlinePayment = asyncHandler(async(req,res,next)=>{
    let cart = await cartModel.findById(req.params.id);
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
    let session = await stripe.checkout.sessions.create({
        line_items:[
            {
            price_data:{
                currency:"egp",
                unit_amount:totalOrderPrice*100,
                product_data:{
                    name:req.user.name,
                },
            },
            quantity: 1,
        }
        ],
        mode:"payment",
        success_url:"https://www.google.com",
        cancel_url:"https://www.facebook.com",
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress,
    });
    res.json({message:"done",session})
})
