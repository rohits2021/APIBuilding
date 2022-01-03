// const JWT_SECRET  = require('../configuration/index');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.verifyToken = function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        // req.token = token
        // next()
        jwt.verify(token,process.env.jwtSecret,(err,authData)=>{
         if(err){
             res.status(401).json({success:false,msg:"something went wrong!"});
         }else{
            //  console.log(authData)
             req.id = authData.user._id;
             req.user = authData.user
             // res.status(200).json({success:true,msg:"Token is verified!",data:authData});
             next()
         }
     })
    }else{
        res.status(401).json({sucess:false,msg:'Token is not pristine'})
    }
}

module.exports.checkRole  = roles => (req, res, next) =>
!roles.includes(req.user.role)
  ? res.status(401).json("Unauthorized! or Access Not Allowed")
  : next();