import multer from "multer";
import { nanoid } from "nanoid";
import { AppError } from "./globalError.js";
import path from "path"
import fs from "fs"

export const allowedValidation = {
    image:["image/jpeg","image/png"],
    pdf:["application/pdf"]
}

export const multerFun = (customValidation, customPath) =>{
    if(!customValidation) {
        customValidation = allowedValidation.image
    }

    const consPath = path.resolve(`uploads${customPath}`)
    if(!fs.existsSync(consPath)){
        fs.mkdirSync( consPath, { recursive: true })
    }
    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, consPath)
        },
        filename: function (req,file,cb) {
            console.log(file);
            cb(null,nanoid(5) + file.originalname)
        }
    })

const fileFilter = (req,file,cb) =>{
    if(customValidation.includes(file.mimetype)){
        cb(null,true)
    }else {

        cb(new AppError("invalid extension", 400),false)
    }
   
}
    const upload = multer({ fileFilter, storage })
    return upload;
}
