import { Router } from "express";

import {signupUser,signinUser, logoutUser, followunfollowUser, updataUser, getUserprofile, getUserfromId} from '../controllers/userController.js';

import { protectedroute } from "../middleware/protectedroute.js";
import cookieParser from "cookie-parser";

const router= Router();
router.use(cookieParser());

router.get('/checking',(req,res)=>{
    res.send('Hello World')
})
router.get('/profile/:username',protectedroute,getUserprofile)
router.post('/signup',signupUser)
router.post('/signin',signinUser)
router.post('/logout',logoutUser)
router.post('/follow/:id',protectedroute,followunfollowUser)
router.put('/update/:id',protectedroute,updataUser)

router.get('/:id',getUserfromId)


export default router;