const Todos = require('../models/todos');
const Users = require('../models/users');


module.exports = {
    deleteTodo : async (req,res)=>{
        try{
            const todoId = req.params.todoId;
            const todo   = await Todos.findById(todoId);       
            const userId = todo.user;
            const user   = await Users.findById(userId);
            await todo.remove();
            user.todos.pull(todo);
            user.save();
            res.status(200).json({success:true})
        }catch(err){
            res.status(500).json({'Error':err})
        }      
    },
    updateTodo : async (req,res)=>{
        try{
            const todoId = req.params.todoId;
            const todo   = await Todos.findById(todoId);
            if(!todo){
                return res.send(400).json({success:false,message:"No Todo with this  Id"})
            }
            await Todos.findByIdAndUpdate({_id:todoId},req.body);
            const todos   = await Todos.findById(todoId);  
            res.status(200).json({success:true,message:todos})
        }catch(err){
            res.status(500).json({'Error':err})
        }      
    }


}
