import multer from "multer";
import { nanoid } from "nanoid";
import { AppError } from "./globalError.js";
import path from "path"
import fs from "fs"

export const allowedValidation = {
    image:["image/jpeg","image/png"],
    pdf:["application/pdf"]
}

export const multerCloudinary = (customValidation, customPath) =>{
    if(!customValidation) {

        customValidation = allowedValidation.image
    }
    
    const storage = multer.diskStorage({})

const fileFilter = (req,file,cb) =>{
    if( customValidation.includes(file.mimetype)){
        cb(null,true)
    }else {
        cb(new AppError("invalid extension", 400),false)
    }
   
}
    const upload = multer({ fileFilter, storage })
    return upload;
}
