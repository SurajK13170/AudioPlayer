const express = require('express')
require("dotenv").config()
const { userModel } = require('../models/User.model')
const {auth} = require("../middelWare/authetication")
const secretKey = process.env.secretKey;
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const userRouter = express.Router()



userRouter.post('/register', async (req, res) => {
    const { name, email, pass, age } = req.body;
    try {
        const existingOwner = await userModel.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ error: 'user already exists!' });
        }

        bcrypt.hash(pass, 10, async (err, hash) => {
            const user = new userModel({
                name,
                email,
                pass: hash,
                age,
            });
            await user.save();
            res.status(200).json({ msg: 'Registration successful!' , user});
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})



userRouter.post('/login', async (req, res) => {
    const { email, pass } = req.body;
   try{
    const user = await userModel.findOne({email})
    bcrypt.compare(pass, user.pass,(err, result)=>{
        if(result){
            const token = jwt.sign({email:user.email}, secretKey)
            res.status(200).json({msg:"login success", token})
        }else{
            res.status(500).json({msg:"login failed"})
        }
    })
   }catch(err){
    res.status(500).json(err)
   }
})

module.exports = { userRouter }