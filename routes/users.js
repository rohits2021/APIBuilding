const router = require('express-promise-router')();
const UsersController = require('../controllers/users');
const verifyToken = require('./verifyToken').verifyToken;


router.route('/signup')
.post(UsersController.signUp);

router.route('/signin')
.post(UsersController.signIn);

router.route('/getUser')
.get(verifyToken,UsersController.getUser);

router.route('/:userId/todos')
.post(verifyToken,UsersController.userCreatesTodo)

router.route('/:userId/todos')
.get(verifyToken,UsersController.getUserTodo)

module.exports = router;

