const router         = require("express-promise-router");
const jwt            = require('jsonwebtoken');
const JWT_SECRET     = require('../configuration/index');
const Users          = require('../models/users');
const hashsed        = require('../helpers/hashPassword');


module.exports = {
    signUp: async (req,res,next)=>{ 
            const email = req.body.email;
            const password = req.body.password;
            //check if user exists with same email
            const isAlreadyExists = await Users.findOne({email});
            if(isAlreadyExists){
                //403 Forbidden
                return res.status(403).json({message:"User already exists,cannot be created again"})
            }else{
                //create a user
                const saltHash = hashsed.genPassword(password);
                const salt =  saltHash.salt;
                const hash =  saltHash.hash;
                const newUser = new Users({email,salt,hash});
                await newUser.save();
                return res.status(200).json({success:true,msg:'User created with hashed pass'})
            }
    },
    signIn: async (req,res,next)=>{
                const email =  req.body.email;
                const password = req.body.password;
                const user = await Users.findOne({email});                     
                if(user){
                    const isValid = hashsed.validPassword(password,user.hash,user.salt) 
                    if(isValid){
                        jwt.sign({user},JWT_SECRET.jwtSecret,{expiresIn:'60s'},(err,token)=>{
                            res.status(200).json({token:token});
                        })
                    }else{
                        res.status(400).json({success:false,msg:"you have entered a wrong password"});
                    }
                }else{
                        res.status(400).json({success:false,msg:"User doesn't exists"})
                }
    },
    secret: (req,res,next)=>{
                res.status(200).json({success:true,msg:"Token is verified!"});
                jwt.verify(req.token,JWT_SECRET.jwtSecret,(err,authData)=>{
                    if(err){
                        res.status(401).json({success:false,msg:"something went wrong!"});
                    }else{
                        res.status(200).json({success:true,msg:"Token is verified!"});
                    }
                })
    },
    
}




    // index: (req,res,next)=>{
    //     // 1 Callback way
    //     // User.find({},(err,users)=>{
    //     //     if(err){
    //     //         next(err);
    //     //     }
    //     //     res.status(200).json(users)
    //     // })
    //     //2 Promises way
    //     User.find({})
    //          .then(users => {
    //              //Do smothing with user
    //              res.status(200).json(users)
    //          })
    //          .catch(err => {
    //              //catch the error
    //              next(err)
    //          })
    // },
    // //3 async await
    // index2:  async (req,res,next)=>{
    //         const alluser = await User.find()
    //         res.status(200).json(alluser) 
    // },

    

