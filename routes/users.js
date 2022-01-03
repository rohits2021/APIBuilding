const router = require('express-promise-router')();
const UsersController = require('../controllers/users');
const verifyToken = require('./verifyToken').verifyToken;
const checkRole =  require('./verifyToken').checkRole;


router.route('/signup')
.post(UsersController.signUp);

router.route('/signin')
.post(UsersController.signIn);

router.route('/getuser')
.get(verifyToken,UsersController.getUser);

router.route('/todos')
.post(verifyToken,UsersController.userCreatesTodo);

router.route('/todos')
.get(verifyToken,UsersController.getUserTodo);

router.route('/getAllCompletedTodos')
.get(verifyToken,checkRole(['admin']),UsersController.getAllCompletedTodos)

module.exports = router;

