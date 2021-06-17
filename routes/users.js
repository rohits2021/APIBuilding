const router = require('express-promise-router')();
const UsersController = require('../controllers/users');
const JWT_SECRET  = require('../configuration/index');
const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
   const bearerHeader = req.headers['authorization']
   if(typeof bearerHeader !== undefined){
       const bearer = bearerHeader.split(' ');
       const token = bearer[1];
       req.token = token
       next()
   }else{
       res.status(401).json({sucess:false,msg:'Token is not pristine'})
   }
}
router.route('/signup')
.post(UsersController.signUp);

router.route('/signin')
.post(UsersController.signIn);

// router.route('/secret')
// .get(UsersController.secret);

router.get('/secret',verifyToken,(req,res)=>{
        jwt.verify(req.token,JWT_SECRET.jwtSecret,(err,authData)=>{
            if(err){
                res.status(401).json({success:false,msg:"something went wrong!"});
            }else{
                res.status(200).json({success:true,msg:"Token is verified!"});
            }
        })
})

module.exports = router;

// const router = express.Router();
// const { ValidateParam } = require('../helpers/routeHelpers')
// router.route('/')
//       .get(UsersController.index2)
//       .post(UsersController.newUser)
// users/:usersId
// router.route('/:userId')
// .get(UsersController.getUser)
// .put(UsersController.replaceUser)
// .patch(UsersController.updateUser)

// router.route('/:userId/cars')
// .get(UsersController.getUserCars)
// .post(UsersController.newUserCar)