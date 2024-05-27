// const express = require("express");
import  express  from "express";
import { protectedroute } from "../middleware/protectedroute.js";
import { Account } from "../db/connectDB.js";
import  mongoose  from "mongoose";
// const {protectedroute} = require("../middleware");
// const {Account} = require("../db.js");
// const {default: mongoose} = require("mongoose");
// const { protectedroute } = require("../middleware/protectedroute.js");

const router = express.Router();
router.get("/balance", async (req, res) => {
    try {
        const id = req.query.userId;
        console.log(id);
        const account = await Account.findOne({ userId: id });
        
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const bal = account.balance;
        res.json({ balance: bal });
    } catch (error) {
        console.error('Error fetching account balance:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post("/transfer",  async (req,res)=>{
    try{
    const session = await mongoose.startSession();

    session.startTransaction(); // starts the transaction in this session 
    const  {amount1,to} = req.body;
    console.log(amount1,to);
    const amount= Number(amount1);
    console.log(amount);
    const account = await Account.findOne({
        userId: req.body.userId,
    }).session(session);

    if(!account || account.balance < amount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        })
    };

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid Account"
        });
    }

        await Account.updateOne(
            
            { userId: req.body.userId},
            { $inc: {balance: -amount}}  // cut the amount send from the sender account
            ).session(session);

        await Account.updateOne({
            userId: to
        },
        {$inc:{ balance: amount}}  // add the amount to the receivers account 
        ).session(session);


        await session.commitTransaction();
        res.json({
            message:"Transfer Successful"
        });}
        catch(error){
            console.log(error.message);
        }

});

// module.exports = router;
// export accountrouter;
export default router;