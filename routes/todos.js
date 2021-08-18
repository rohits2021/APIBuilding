const router = require('express-promise-router')();
const TodosController = require('../controllers/todos');

router.route('/delete/:todoId')
.delete(TodosController.deleteTodo);

router.route('/update/:todoId')
.put(TodosController.updateTodo);


module.exports = router;
