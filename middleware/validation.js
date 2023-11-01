import Joi from "joi"

export const generalField = {
    email: Joi.string()
    .email({tlds: {allow : ["com","net"]}})
    .required(),
    password: Joi.string().required().min(4).max(30),
    rePassword: Joi.string().valid(Joi.ref("password")).required(),
};


export const Validation = (schema) =>{
    return (req, res, next) =>{
        let inputs = {...req.body, ...req.params, ...req.query}
        let {error} = schema.validate(inputs, {abortEarly:false});
        if(error){
            let errors = error.details.map((detail) => detail.message)
            res.json(errors)
        }else{
            next()
        }
    };
};