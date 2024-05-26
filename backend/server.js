import express from 'express';
const app = express();
import {v2 as cloudinary} from 'cloudinary';
import cors from 'cors';
app.use(cors());

import bodyParser from 'body-parser';

          

import userRouter from './routes/userRouter.js'
import postRouter from './routes/postRouter.js'
import {User,Post }from './db/connectDB.js'
import productRouter from './routes/productRoute.js'

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


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


app.get("/", async (req, res)=>{
  res.send("Hello World");
})




app.use('/api/users',userRouter);
app.use('/api/posts',postRouter);
app.use('/api/product',productRouter);



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})