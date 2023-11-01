
import {Schema,model,Types} from "mongoose";


const subCategorySchema = new Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"],
            lowercase:true,
            minLength:[2,"name is too short"],
            unique:[true,"name is unique"]
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
        image:Object,

        images:{
            type:[Object],
        } 
    },
    {
        timestamps:true,
    }
);

const subCategoryModel = model("SubCategory", subCategorySchema);

export default subCategoryModel
