import express from 'express';
const app = express();
import {v2 as cloudinary} from 'cloudinary';
import cors from 'cors';
app.use(cors());
          

import userRouter from './routes/userRouter.js'
import postRouter from './routes/postRouter.js'
import {User,Post }from './db/connectDB.js'

app.use(express.json());
app.use(express.urlencoded({extended: true}));
import dotenv from 'dotenv'
dotenv.config();
const PORT=process.env.PORT || 5000;
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key:  process.env.CLOUDINARY_KEY, 
    api_secret:  process.env.CLOUDINARY_SECRET
  });







app.use('/api/users',userRouter);
app.use('/api/posts',postRouter);



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})