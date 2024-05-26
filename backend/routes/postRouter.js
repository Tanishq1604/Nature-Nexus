import { Router } from "express";
import cookieParser from "cookie-parser";
import { protectedroute } from "../middleware/protectedroute.js";

import { bulkposts, createPost, deletePost, getPost, likeunlikepost, myfeed, repliestopost } from "../controllers/postControllers.js";


const router= Router();
router.use(cookieParser());
router.get('/checking',(req,res)=>{
    res.send('Hello World');
})
router.post('/create',protectedroute,createPost)

router.get('/:id',getPost)

router.delete('/:id',protectedroute,deletePost)
router.post('/like/:id',protectedroute,likeunlikepost)
router.post('/replies/:id',protectedroute,repliestopost)
router.post('/feed',protectedroute,myfeed)

router.post('/bulk',bulkposts)





export default router;