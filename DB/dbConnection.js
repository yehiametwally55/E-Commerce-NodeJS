import mongoose from 'mongoose';

export const dbConnection = () =>{
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(()=>{
    console.log("connected to mongo");
}).catch((err)=>{
    console.log(err);
})
}