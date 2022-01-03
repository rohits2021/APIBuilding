const jwt            = require('jsonwebtoken');
const Users          = require('../models/users');
const Todos = require("../models/todos");
const bcrypt = require('bcrypt');
const userSchema = require('../helpers/routeHelpers').authSchema;
require('dotenv').config();

module.exports = {
    signUp: async (req,res)=>{
        try{
            // console.log(userSchema)
            const result = userSchema.validate(req.body);
            // console.log(result)
            if(result.error){
                return res.status(400).send(result.error.details[0].message)
            }
            const email = result.value.email;
            const password = result.value.password;
            //check if user exists with same email
            const isAlreadyExists = await Users.findOne({email});
            if(isAlreadyExists){
                return res.status(403).json({message:"User already exists,cannot be created again"})
            }else{
            //create user
            const hash = await bcrypt.hash(password,10); 
            const newUser = new Users({
                email,
                password : hash
            });
            // throw 'Custom Error'
            await newUser.save();      
            return res.status(200).json({success:true,message:'User created Successfully'})
            }
        } catch(err){
            return res.status(500).send({success:false,message:err});
        }

            
    },
    signIn: async (req,res)=>{
        try{
            const email =  req.body.email;
            const password = req.body.password;
            const user = await Users.findOne({email});                     
            if(user){
                const isValid = await bcrypt.compare(password,user.password);
                if(isValid){                 
                    let promise = new Promise((resolve,reject)=>{
                        let token = jwt.sign({user},process.env.jwtSecret,{expiresIn:'3600s'});
                        if(!token){
                            reject('token Error')
                        }
                        resolve(token)
                    })
                    // promise.then((value)=>{
                    //     res.status(200).json({token:value});
                    // })
                    let result = await promise;
                    res.status(200).json({token:result});                   
                }else{
                    res.status(400).json({success:false,message:"you have entered a wrong password"});
                }
            }else{
                    res.status(400).json({success:false,message:"User doesn't exists"})
            }
        }catch(err){
            res.status(500).json({success:false,message:`Header is not set! or ${err}`})
        }
    },
    getUser: async (req,res)=>{
        try {
            const _id = req.id;
            console.log(req.user);
            const user = await Users.findOne({_id});    
            res.status(200).json({success:true,message:user});
        } catch (error) {
            res.send(error)
        }                          
    }, 
    userCreatesTodo: async (req,res)=>{
            try{
                const _id = req.id;        
                const todo     = new Todos(req.body);        
                const user    = await Users.findById(_id);    
                // console.log(user);
                todo.user = user;
                await todo.save();
                await user.todos.push(todo); 
                await user.save();
                return res.status(200).json({message:user});
            } catch(err){
                res.send(err);
            }           
    },
    getUserTodo: async (req,res)=>{
            try {
                const _id = req.id;
                const user     = await Users.findById(_id).populate('todos');
                return res.status(200).json({message:user});
            } catch(err) {
                res.send(err)
            }        
    },
    getAllCompletedTodos: async (req,res)=>{
        try {
            // console.log(req.user.role)
            const todos     = await Todos.find({"status":"completed"});
            return res.status(200).json({success:true,message:todos});
        } catch(err) {
            res.send(err)
        }        
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


    // const email =  req.body.email;
            // const password = req.body.password;
            // const user = await Users.findOne({email});                     
            // if(user){
            //     const isValid = await bcrypt.compare(password,user.password);
            //     if(isValid){
            //         let jwt1 = await jwt.sign({user},process.env.jwtSecret,{expiresIn:'3600s'});
            //         console.log(jwt1);
            //         res.status(200).json({token:jwt1});
            //         // jwt.sign({user},process.env.jwtSecret,{expiresIn:'3600s'},(err,token)=>{
            //         //     res.status(200).json({token:token});
            //         // })
            //     }else{
            //         res.status(400).json({success:false,msg:"you have entered a wrong password"});
            //     }
            // }else{
            //         res.status(400).json({success:false,msg:"User doesn't exists"})
            // }
    

