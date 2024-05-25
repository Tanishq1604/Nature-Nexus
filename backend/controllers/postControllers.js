import { Post, User } from "../db/connectDB.js";

import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
	try {
		const { postedBy, text ,lat,long} = req.body;
		let { img } = req.body;

		if (!postedBy || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newPost = new Post({ postedBy, text, img ,lat,long });
		await newPost.save();

		res.status(201).json(newPost);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};


export const getPost =async  (req, res) =>{
    try{
        const id=req.params.id;
        console.log(id);
        const post = await Post.findById(id);

        if(!post){
            res.status(404).json({message:"post not found "});
        }
        res.status(200).json({message:'post found successfully',post});
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}
export const deletePost = async (req, res) => {
    try{
        const id=req.params.id;
        console.log(id);
        if(id!==req.user._id){
            res.status(404).json({message:"you cannot delete other users posts"})
        }
        const post = await Post.findByIdAndDelete(id);

        if(!post){
            res.status(404).json({message:"post not found "});
        }
        res.status(200).json({message:'post deleted successfully',post});
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}


export const likeunlikepost = async (req, res) => {
    try{

        const {id}=req.params;
    const userId=req.user._id;
        console.log(userId);
        const post = await Post.findById(id);
        if(!post){
            res.status(404).json({message:"post not found "});
        }
        const isLiked=  post.likes.includes(userId);
        if(isLiked){
           await Post.findByIdAndUpdate(id,{$pull:{likes:userId}})
           res.status(200).json({message:"post unliked successfully "});
        }
        else{
           
            await Post.findByIdAndUpdate(id,{$push:{likes:userId}})
            res.status(200).json({message:"post liked successfully "});
        }
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
   

}


export const repliestopost= async (req,res)=>{
   const {id}=req.params;
   const {text}=req.body;
   const userId=req.user._id;
   try{
       const post = await Post.findById(id);
       if(!post){
           res.status(404).json({message:"post not found "});
       }
       const maxLength= 500;
       if(text.length>maxLength){
           res.status(404).json({message:"text is too long "});
       }
       post.replies.push({
        userId,
        text,
        userProfilePic:req.user.profilePic,
        username:req.user.username
       })
       const savedPost = await post.save();
       res.status(201).json({
           message:"post replied successfully",
           savedPost
       })
      
       
      


   }
   catch(e){
       res.status(404).json({message:e.message});
   }


}
export const myfeed =async  (req, res) =>{
    try{
       const userId=req.user._id;
       const user= await User.findById(userId);
       if(!user){
           res.status(404).json({message:"user not found "});
       }
       const following = user.following;
       const posts = await Post.find({
           postedBy:{$in:following}
       }).sort({createdAt:-1});
       if(!posts){
        res.status(404).json({message:"posts not found "});
       }
       res.status(200).json({message:'posts found successfully',posts});

    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}
export const bulkposts =async  (req, res) => {
    try{
        console.log("bulk");
        const posts = await Post.find({}).sort({createdAt:-1});
        if(!posts){
            res.status(404).json({message:"posts not found "});
        }
        res.status(200).json({message:'posts found successfully',posts});
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}