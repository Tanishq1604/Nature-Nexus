import bcrypt from "bcryptjs";
import { Account, User } from "../db/connectDB.js";
import createtoken from "../utils/helpers/token.js";
import {v2 as cloudinary} from 'cloudinary';
export const signupUser= async (req,res)=>{
    try {
        const {

            name,username,password,usertype

          
            
        } = req.body;
        const existingUser = await User.findOne({
            username: username
        })
        if (existingUser) {
            res.status(400).json({message: 'user already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({name,username,password:hashedPassword,usertype});

        const savedUser= await user.save();
      
        
        if(savedUser){
            createtoken(savedUser._id,res);
            const userId= savedUser._id;
            console.log(userId);
            await Account.create({
                userId,
                balance: 1 + Math.random() * 100000
    
            })
            res.status(201).json({
                message: 'user saved successfully',
               
                _id: savedUser._id,
                name: savedUser.name,
                username: savedUser.username,
                bio: savedUser.bio,
                profilePic: savedUser.profilePic,

                usertype: savedUser.usertype,
                karma:savedUser.karma,

              
             
            });
        }
        else{
            res.status(400).json({message: 'user not saved'})
        }
       
    } catch (error) {
                   console.log(error.message);
    }
   
};

export const signinUser= async (req,res)=>{
    try{
        const {username,password}= req.body;
        const user = await User.findOne({username});
        const ispass= await bcrypt.compare(password,user?.password || "");
        if(!user ){
            return res.status(401).json({message: 'invailed crendentials'});
        }
        createtoken(user._id,res);

        console.log(req.cookies.token)

        res.status(200).json({
            message: 'logged in successfully',
            usertype:user.usertype,
           
            _id: user._id,
            name: user.name,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
            karma: user.karma


        })

      



    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}
export const logoutUser = (req, res) => {
    res.cookie('token','',{maxAge:1});
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}
export const followunfollowUser = async (req, res) => {
    try{

        const Id= req.params.id;
        const friend= await User.findById(Id);
        const userId= req.user._id;
        const user= await User.findById(userId);
        if(Id===userId){
          return res.status(400).json({message: 'you cannot follow yourself'});
        }
        if(!friend){
          return res.status(400).json({message: 'user not found'});
        }
        const isfollow= user.followers.includes(Id);
      
        if(isfollow){
        await User.findByIdAndUpdate(Id,{$pull:{followers:userId}});
        await User.findByIdAndUpdate(userId,{$pull:{following:Id}})
        res.status(200).json({message: 'User unfollowed'});
      
        }
        else{
     
          await User.findByIdAndUpdate(Id,{$push:{followers:userId}});
          await User.findByIdAndUpdate(userId,{$push:{following:Id}})
          res.status(200).json({message: 'User followed'});
      
        }
      
    }
    catch(error){
        res.status(400).json({message: error.message})
    }


}
export const updataUser = async (req,res)=>{
    try{
        const {username,password,bio}= req.body;
        let{profilePic}= req.body;
        const user = await User.findById(req.user._id);
      
        user.username=username||user.username;
       
        user.bio=bio||user.bio;
        if(req.params.id!==req.user._id.toString()){
            res.status(404).json({message:"you cannot update other users profiles"})
        }
        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password= hashedPassword ||user.password;
        }
        if(profilePic){
            if(user.profilePic){
                cloudinary.uploader.destroy(user.profilePic.split('/').pop().split('.')[0]);
            }

           const result= await cloudinary.uploader.upload(profilePic);
           profilePic =result.secure_url;
        }
        user.profilePic=profilePic||user.profilePic;
        const savedUser= await user.save();
        const userId = savedUser._id; 
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })
     
       res.status(200).json({message:"saved",
       _id: savedUser._id,
       name: savedUser.name,
       karma: savedUser.karma,
       username: savedUser.username,
       bio: savedUser.bio,
       usertype: savedUser.usertype,
       profilePic: savedUser.profilePic,
       followers: savedUser.followers,
       following: savedUser.following,
       createdAt: savedUser.createdAt,
       updatedAt: savedUser.updatedAt
    
    
    
    });
       
    } catch (error) {
                   console.log("error",error.message);
    }
}
export const getUserprofile= async (req, res) => {
    const username=req.params.username;
    try{
        const user = await User.findOne({username}).select('-password').select('-updateAt');
        res.status(200).json({user});
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

export const getUserfromId=async (req, res) => {
    const userId=req.params.id;
    try{
        const user = await User.findById(userId).select('-password').select('-updateAt');
        res.status(200).json({user});
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}
export const showkarma = async (req, res) => {
    const userId = req.params.id;
    console.log('1');
    const  karmaToAdd  = Number(req.body.karma);
    console.log('2');

    if (typeof karmaToAdd !== 'number') {
        return res.status(400).json({ error: 'karmaToAdd must be a number' });
      console.log('3');
    }

    try {
        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            user = new User({ userId, karma: karmaToAdd });
        } else {
            user.karma += karmaToAdd;
        }
        await user.save();
        res.json({
            message:"Successfully added",
            karma: user.karma,
            _id: user._id,
            name: user.name,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
            usertype:user.usertype,
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' ,e:err.message});
    }
}
