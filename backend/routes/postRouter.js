import { Router } from "express";
import cookieParser from "cookie-parser";
import { protectedroute } from "../middleware/protectedroute.js";
import { createPost, deletePost, getPost, likeunlikepost, myfeed, repliestopost } from "../controllers/postControllers.js";

const router= Router();
router.use(cookieParser());
router.get('/checking',(req,res)=>{
    res.send('Hello World');
})
router.post('/create',protectedroute,createPost)
router.get('/:id',protectedroute,getPost)
router.delete('/:id',protectedroute,deletePost)
router.post('/like/:id',protectedroute,likeunlikepost)
router.post('/replies/:id',protectedroute,repliestopost)
router.post('/feed',protectedroute,myfeed)




export default router;