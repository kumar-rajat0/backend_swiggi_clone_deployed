import bcrypt from 'bcrypt'
import UserModel from '../Models/User.model.js'
import jwt from 'jsonwebtoken'

//Register
export async function register(req,res){
    try{
        let {fullName,email,password} = req.body
        let data = await UserModel.findOne({email})
        if(data){
            return res.status(409).json({"Messgae":"User Already Exist"})
        }else{
            const newUser = await UserModel.create({
                fullName,
                email,
                password: bcrypt.hashSync(password, 10)
            }) 
            return res.status(201).json({"Message" : newUser})
        }
    }
    catch(err){
        return res.status(500).json({"errorMes":err})
    }
}


//Compare 

export async function login(req,res){
    try{
        const{email,password} =req.body
        const data = await UserModel.findOne({email})
        if(!data){
            return res.status(401).json({"Message":"User not Exist"})
        }  
        const validPassword = bcrypt.compareSync(password, data.password);
        if(!validPassword){
           return res.status(401).json({"Message":"Invalid Crendentials"})
        }

        // Token (JWT)
        var token = jwt.sign({id:data._id}, 'SECRETKEY');

        return res.status(403).json({
            user:{
                email : data.email,
                fullName : data.fullName
            },

            //Access Token : Token
            accessToken : token

        })
    }
     catch(err){
        return res.status(500).json({"errorMes":err})
    }
}