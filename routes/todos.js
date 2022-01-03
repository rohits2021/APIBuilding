const router = require('express-promise-router')();
const TodosController = require('../controllers/todos');
const checkRole = require('./verifyToken').checkRole;
const verifyToken = require('./verifyToken').verifyToken

router.route('/delete/:todoId')
.delete(verifyToken,TodosController.deleteTodo);

router.route('/update/:todoId')
.put(verifyToken,TodosController.updateTodo);

router.route('/patchStatus/:todoId')
.patch(verifyToken,TodosController.patchStatus);

router.route('/patchApprove/:todoId')
.patch(verifyToken,checkRole(['admin']),TodosController.patchApprove);


module.exports = router;
