import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
console.log("Connecting to")
// models/product.js


const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);






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
        },
        karma:{
            type:Number,
            default:0
        },
        usertype:{
            type:String,
            default:"user"
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
            default:""
           
        },
    
            lat:{
                type:String,
                default:""
            },
           long:{
            type:String,
            default:""
 
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
    
    
    export {User,Post,Product};