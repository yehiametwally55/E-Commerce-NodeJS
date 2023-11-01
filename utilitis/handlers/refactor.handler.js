import { AppError, asyncHandler } from "../globalError.js";

export const deleteOne = (model) =>{
    return asyncHandler(async (req,res,next) =>{
        const {id} = req.params;
        const exist = await model.findOne({_id:id});
        if(!exist){
            return next(new AppError("item doesn't exist", 400))
        }
            const deleted = await model.findByIdAndRemove({
                _id: id,
            }
                )
                res.status(201).json({message:"item deleted", deleted})
    })
}