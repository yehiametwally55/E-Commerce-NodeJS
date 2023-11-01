import {Schema,model,Types} from "mongoose";
import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
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
    totalOrderPrice:Number,
    discount:Number,
    totalOrderAfterDiscount:Number,
    paymentMethod:{
        type:String,
        enums:["cash","credit"],
        default:"cash"
    },
    shippingAddress:{
        city:String,
        street:String
    },
    isPaid: Boolean,
    paidAt: Date,
    isDeliverd: Boolean
},
{timestamps:true}
)
const orderModel = mongoose.model("order", orderSchema);

export default orderModel
