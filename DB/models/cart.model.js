import {Schema,model,Types} from "mongoose";
import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    cartItems:[{
        product:{
            type:mongoose.Types.ObjectId,
            ref:"product"
        },
        quantity:{
            type:Number,
            default:1
        },
        price:{
            type:Number
        }
    }],
    totalPrice:Number,
    discount:Number,
    totalPriceAfterDiscount:Number
},
{timestamps:true}
)
const cartModel = mongoose.model("cart", cartSchema);

export default cartModel
