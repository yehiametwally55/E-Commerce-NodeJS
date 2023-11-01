import mongoose, {Schema,model,Types} from "mongoose";

const ReviewSchema = new Schema(
    {
       comment:{
        type:String,
        trim:true,
        required:[true,"review comment required"]
       },
       product:{
        type:mongoose.Types.ObjectId,
        ref:"product"
       },
       user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
       },
       rating:{
        type:Number,
        min:1,
        max:5
       }
    },
    {
        timestamps:true,
    }
);
ReviewSchema.pre(/^find/, function(){
    this.populate('user','name')
})

const ReviewModel = model("Review", ReviewSchema);

export default ReviewModel
