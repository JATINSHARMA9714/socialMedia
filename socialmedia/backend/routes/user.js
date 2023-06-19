const express = require('express');
const User = require('../Models/User');
const bycrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const jwt=require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser');

//authToken secret
const secret="groupProject";

//Route - 1  Sign Up
router.post('/signup',[
    body('name', "enter a valid name").isLength({ min: 1 }),
    body('email', "enter a valid email").isEmail(),
    body('password').isLength({ min: 3 }),
],async(req,res)=>{

    //Checking if user already exists
    let findUser=await User.findOne({email:req.body.email});
    if(findUser){
        success=false;
        return res.status(400).json({success:success,message:'User Already Exists'});
    }
    //checking for validation errors like email,password
    const errors = validationResult(req);

    //error handling
    if(!errors.isEmpty()){
        success=false;
        res.status(400).send({success,errors});
    }
    else{
        //securing the password using bycrypt
        let salt=bycrypt.genSaltSync(10);
        let securePassword=bycrypt.hashSync(req.body.password,salt);
    
        //creating new User
        let newUser=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:securePassword
        })

        //sending a token to get saved in localSystem
        const tokenData={
            user:{
                id:newUser.id
            }
        }
        const authToken=jwt.sign(data,secret);
        success=true;
        res.status(201).json({success:success,authToken:authToken});
    }
})

//Route - 2 Login 
router.post('/login', [
    body('email', "enter a valid email").isEmail(),
    body('password', "Cannot be empty").exists(),
], async (req, res)=>{
    //validation error checking
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        success=false;
        res.status(400).json({success,errors});
    }
    else{
        //find the user
        let findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            success=false;
            return res.status(400).json({success:success,message:"User Does Not Exists"});
        }
        //Password Comparison
        const passCompare = bycrypt.compareSync(req.body.password, findUser.password);
        if (passCompare) {
            //user login success
            const data={
                user:{
                    id:findUser.id
                }
            }
            const authToken=jwt.sign(data,secret);
            success=true;
            res.stauts(200).json({success:success,authToken:authToken});
        }
        else {
            success=false
            res.status(400).json({success:success,message:"User Not Found"})
        }
    }
})

//endpoint to extract data front authToken
router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        const userid=req.body.id;
        const userDetails=await User.findById(userid).select('-password');
        res.json(userDetails);
    }
    catch{
        res.status(400).send('User Not Found');
    }
})
module.exports = router