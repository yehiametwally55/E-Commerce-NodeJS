import {Schema,model,Types} from "mongoose";


const categorySchema = new Schema(
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
        image:Object,

        images:{
            type:[Object],
        }
        
    },
   
    {
        timestamps:true,
    }
);
categorySchema.post('init', (doc)=>{
    doc.image = "http://localhost:3000/category/" + doc.image;
})

const categoryModel = model("Category", categorySchema);

export default categoryModel
