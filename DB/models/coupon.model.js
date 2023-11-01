import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:[true,"coupon code required"],
        unique:true,
    },
    discount:{
        type: Number,
        min:0,
        required:[true,"coupon discount required"],
    },
    expires:{
        type:String,
        required:[true, 'coupon data required']
    }
}, { timeStamps:true})

const couponModel = mongoose.model('coupon', couponSchema)
export default couponModel