import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
dotenv.config();
export default function createtoken(userId,res){
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: '15d'})
    res.cookie('token',token,{httpOnly:true,maxAge:15*24*60*60*1000,sameSite:"strict"})
   
}