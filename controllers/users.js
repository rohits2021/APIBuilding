const router = require("express-promise-router");
const User = require('../models/user');
const Users = require('../models/users');
const Car = require('../models/car');

// const Joi  = require('joi')
// const idSchema = Joi.object().keys({
//     userId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
// })



module.exports = {
    signUp: async (req,res,next)=>{
        
        const { email,password} =  req.body;

        //check if user exists with same email
        const isAlreadyExists = await User.findOne({email})
        if(isAlreadyExists){
            //403 Forbidden
           return res.status(403).json({message:"User already exists,cannot be created again"})
        }else{
            //create a user 
            const newUser = new Users({email,password});
            await newUser.save();

            //respond with a token instead of message
           return res.status(201).json({user: "created"})
        }
        
    },
    signIn: (req,res,next)=>{
        
    },
    secret: (req,res,next)=>{
        
    },
    index: (req,res,next)=>{
        // 1 Callback way
        // User.find({},(err,users)=>{
        //     if(err){
        //         next(err);
        //     }
        //     res.status(200).json(users)
        // })
        //2 Promises way
        User.find({})
             .then(users => {
                 //Do smothing with user
                 res.status(200).json(users)
             })
             .catch(err => {
                 //catch the error
                 next(err)
             })
    },
    //3 async await
    index2:  async (req,res,next)=>{
            const alluser = await User.find()
            res.status(200).json(alluser) 
    },

    newUser: (req,res,next)=>{
        const newUser = new User(req.body);
        newUser.save((err,user)=>{
            res.status(201).json(user);
        })
    },

    getUser: async (req,res,next)=>{
       // to get the basic sense of how Joi works!
       //    const result =  idSchema.validate(req.params);
       //    console.log(result);
       const {userId} = req.params;
       const user = await User.findById(userId);
       res.status(200).json(user);
    },

    replaceUser : async (req,res,next)=>{
        // req.body should contain all number of fields
        const {userId} = req.params;
        const newUser  = req.body; 
        const replaceUser = await User.findByIdAndUpdate(userId,newUser)
        res.status(200).json({succes : true});
    },

    updateUser  : async (req,res,next)=>{
        // req.body may contain any number of fields
        const {userId} = req.params;
        const newUser  = req.body; 
        const replaceUser = await User.findByIdAndUpdate(userId,newUser)
        res.status(200).json({succes : true});
    },


    getUserCars: async (req,res,next)=>{
        const {userId} = req.params;
        const user =  await User.findById(userId).populate('cars');
        res.status(200).json(user.cars);
    },

    newUserCar: async (req,res,next)=>{
        const {userId} = req.params;
        //create new car
        const newCar = new Car(req.body);
        //get a user
        const user = await User.findById(userId)
        //Assign user as a seller
        newCar.seller = user;
        //save the car
        await newCar.save();
        //add car to the user selling array 'cars'
        user.cars.push(newCar);
        //Save the user
        await user.save();
        res.status(201).json(newCar);
    }
}



// we can interact with mongoose in 3 different ways:
// 1. Callbacks
// 2. Promises
// 3. Async/Await (Promises but with different syntax)