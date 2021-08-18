const jwt            = require('jsonwebtoken');
const Users          = require('../models/users');
const Todos = require("../models/todos");
const bcrypt = require('bcrypt');
const Joi = require('joi');
const userSchema = require('../helpers/routeHelpers').authSchema;
require('dotenv').config();

module.exports = {
    signUp: async (req,res)=>{
        // console.log(userSchema)
            const result = userSchema.validate(req.body);
            // console.log(result)
            if(result.error){
                return res.status(500).send(result.error.details[0].message)
            }
            const email = result.value.email;
            const password = result.value.password;
            //check if user exists with same email
            const isAlreadyExists = await Users.findOne({email});
            if(isAlreadyExists){
                //403 Forbidden
                return res.status(403).json({message:"User already exists,cannot be created again"})
            }else{
            //create user
            const hash = await bcrypt.hash(password,10); 
            const newUser = new Users({
                email,
                password : hash
            });
            await newUser.save();
            return res.status(200).json({success:true,msg:'User created Successfully'})
            }
    },
    signIn: async (req,res)=>{
            const email =  req.body.email;
            const password = req.body.password;
            const user = await Users.findOne({email});                     
            if(user){
                const isValid = await bcrypt.compare(password,user.password);
                if(isValid){
                    jwt.sign({user},process.env.jwtSecret,{expiresIn:'180s'},(err,token)=>{
                        res.status(200).json({token:token});
                    })
                }else{
                    res.status(400).json({success:false,msg:"you have entered a wrong password"});
                }
            }else{
                    res.status(400).json({success:false,msg:"User doesn't exists"})
            }
    },
    getUser: async (req,res)=>{               
            const _id = req.id;
            const user = await Users.findOne({_id});
            // console.log(user);     
            res.status(200).json({success:true,msg:user});
    }, 
    userCreatesTodo: async (req,res)=>{
            try{
                const userId = req.params.userId;        
                const todo     = new Todos(req.body);        
                const user    = await Users.findById(userId);    
                // console.log(user);
                todo.user = user;
                await todo.save();
                user.todos.push(todo); 
                await user.save();
                res.status(200).json(user);
            } catch(err){
                res.send(err);
            }
           
    },
    getUserTodo: async (req,res)=>{
            const {userId} = req.params;
            const user     = await Users.findById(userId).populate('todos');
            res.status(200).json(user);
    }   
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

    

