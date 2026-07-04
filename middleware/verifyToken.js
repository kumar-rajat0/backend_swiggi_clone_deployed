import jwt from "jsonwebtoken"
import UserModel from "../Models/User.model.js"

export function verifyTOken(req,res,next){
    if(
        req.headers &&
        req.headers.authorization &&
         req.headers.authorization.split(" ")[0] === 'JWT'
    ){
        jwt.verify(req.headers.authorization.split(" ")[1] , 'SECRETKEY',(err,verifiedToken)=>{
            if(err){
                return res.status(403).json({"message":"Invalid Token"})
            }
            // console.log(verifiedToken,"veryfiedTOken")

            UserModel.findById(verifiedToken.id)
            .then((user)=>{
                // console.log(user)
                // console.log(req ,"before") 
                req.user = user
                //  console.log(req ,"after")
                next()
            })
            .catch((err)=>{
                return res.status(500).json({"message":err.message})
            })
        });
    }
    else{
        return res.status(404).json({"Message":"Token not found"})
    }
}