const express = require('express');
const {validateBody,schemas} = require('../helpers/routeHelpers')
const router = require('express-promise-router')();
// const router = express.Router();


const UsersController = require('../controllers/users');
// const { ValidateParam } = require('../helpers/routeHelpers')

router.route('/')
      .get(UsersController.index2)
      .post(UsersController.newUser)

// users/:usersId
router.route('/:userId')
.get(UsersController.getUser)
.put(UsersController.replaceUser)
.patch(UsersController.updateUser)

router.route('/:userId/cars')
.get(UsersController.getUserCars)
.post(UsersController.newUserCar)

router.route('/signup')
.post(UsersController.signUp);

router.route('/signin')
.post(UsersController.signIn);

router.route('/secret')
.post(UsersController.secret);



module.exports = router;


//for validation with joi
// validateBody(schemas.authSchema),