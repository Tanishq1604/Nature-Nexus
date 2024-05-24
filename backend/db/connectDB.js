import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
console.log("Connecting to")




    const userSchema= new mongoose.Schema({
        name:{
            type:String,
            required:true,
            
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
       
        password:{
            type:String,
            required:true,
           
        },
        profilePic:{
            type:String,
            default:""
        },
        followers:{
            type:[String],
            default:[]
        },
        following:{
            type:[String],
            default:[]
        }
        ,bio:{
            type:String,
            default:""
        }
    
    
    
    },{timestamps:true});
    
    const postSchema= new mongoose.Schema({
      
        postedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        text:{
            type:String,
            required:true
        },
        img:{
            type:String,
           
        },
        likes:{
           type:[mongoose.Schema.Types.ObjectId],
            ref:"User",
            default:[]
        },
        replies:[{
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            text:{
                type:String,
                required:true
            },
            userProfilePic:{
                type:String,
            },
            username:{
                type:String
            }
        }]
    
    },{
        timestamps:true
    });
    
    const Post=mongoose.model('Post',postSchema);
    
    
    const User=mongoose.model('User',userSchema);
    
    
    export {User,Post};