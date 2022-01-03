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
            await user.todos.pull(todo);
            await user.save();
            return res.status(200).json({success:true})
        }catch(err){
            return res.status(500).json({'Error':err})
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
            return res.status(200).json({success:true,message:todos})
        }catch(err){
            return res.status(500).json({'Error':err})
        }      
    },
    patchStatus : async (req,res)=>{
        try{
            const todoId = req.params.todoId;
            const todo   = await Todos.findById(todoId);
            console.log(todoId,todo)
            if(!todo){
                return res.send(400).json({success:false,message:"No Todo with this  Id"})
            }
            const todos = await Todos.findByIdAndUpdate({_id:todoId},req.body,{new:true});
            // const todos   = await Todos.findById(todoId);  
            return res.status(200).json({success:true,message:todos})
        }catch(err){
            return res.status(500).json({'Error':err})
        }      
    },
    patchApprove : async (req,res)=>{
        try{
            const todoId = req.params.todoId;
            const todo   = await Todos.findById(todoId);
            console.log(req.user.role)
            if(!todo){
                return res.send(400).json({success:false,message:"No Todo with this  Id"})
            }
            const todos = await Todos.findByIdAndUpdate({_id:todoId},req.body,{new:true});
            // const todos   = await Todos.findById(todoId);  
            return res.status(200).json({success:true,message:todos})
        }catch(err){
            return res.status(500).json({'Error':err})
        }      
    },


}
