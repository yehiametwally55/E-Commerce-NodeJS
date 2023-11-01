import {Schema,model,Types} from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"],
            lowercase:true,
            minLength:[2,"name is too short"],
        },
        description:{
            type:String,
            minLength:[2,"name is too short"],
        },
        colors:[String],
        size:{
            type:[String],
            enum:["s","m","l","xl"]
        },
        price:{
            type:Number,
            required:true,
        },
        discount:{
            type:Number,
            default:0
        },
        finalPrice:{
            type:Number,
            required:true,
        },
        amount:{
            type:Number,
            default:0
        },
        quantity:{
            type:Number,
            default:0
        },
        soldItems:{
            type:Number,
            default:0
        },
        status:{
            type:Boolean,
            default:false
        },
        slug:{
            type:String,
            required:[true,"slug is required"],
        },
        categoryId:{
            type:Types.ObjectId,
            ref:"Category",
            required:true,
        },
        subCategoryId:{
            type:Types.ObjectId,
            ref:"SubCategory",
            required:true,
        },
        brandId:{
            type:Types.ObjectId,
            ref:"Brand",
            required:true,
        },
        createdBy:{
            type:Types.ObjectId,
           ref:"User",
        //    required:true
        },
        updatedBy:{
            type:Types.ObjectId,
           ref:"User"
        },
        deletedBy:{
            type:Types.ObjectId,
           ref:"User"
        },
    },
    {
        timestamps:true,
        toJSON:{virtuals: true},
        toObject:{virtual:true}
    }
);

// productSchema.virtual("myReview",{
//     ref:"Review",
//     localField:"_id",
//     foreignField:"product"
// })
// productSchema.pre(/^find/, function(){
//     this.populate("myReview")
// })
const productModel = model("Product", productSchema);

export default productModel
