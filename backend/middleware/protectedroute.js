import dotenv from 'dotenv'
import { User } from '../db/connectDB.js';
dotenv.config();
import jwt from 'jsonwebtoken';


export  async function protectedroute(req,res,next ){
    try{

        const token = req.cookies.token;
        console.log(token);
       
        if(!token){
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }
        jwt.verify(token,process.env.JWT_SECRET,async (err,decoded)=>{
            if(err){
                return res.status(401).json({
                    success: false,
                    message: "unauthorized"
                })
            }
            const user= await User.findById(decoded.userId).select('-password')
            req.user=user;
    
            next();
            console.log("done");
        })
    }
    catch(error){
        res.status(400).json({message: error.message,success: false})
    }


}