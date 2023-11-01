import mongoose, {Schema,model} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"],
            lowercase:true,
            minLength:[2,"name is too short"]
        },
        email:{
            type:String,
            required:[true,"email is required"],
            lowercase:true,
            unique:[true,"emails is unique"],
        },
        password:{
            type:String,
            required:[true,"password is required"],
            minLength:4
        },
        phone:{
            type:String,
            required:[true,"phone is required"],
        },
        age:{
            type:Number,
            required:[true,"age is required"],
            min:18
        },
        active:{
            type:Boolean,
            default:false
        },
        confirmed:{
            type:Boolean,
            default:false
        },
        block:{
            type:Boolean,
            default:false
        },
        wishList:[{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"product"
        }],
        address:[{
            city:String,
            street:String,
            phone:String
        }],
        role:{
            type:String,
            default:"user",
            enum:["user","admin"],
        },
        changePassAt:{
            type:Date,
        },
    },
    {
        timestamps:true,
    }
);

userSchema.pre("save", function(){
    console.log(this);
    this.password = bcrypt.hashSync(this.password,7);
})
userSchema.pre("findOneAndUpdate", function(){
    console.log(this);
    this._update.password = bcrypt.hashSync(this._update.password , 7 );
})

const userModel = model("User", userSchema);

export default userModel
