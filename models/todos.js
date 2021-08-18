const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TodosSchema = new Schema({
     title      : {type: String},
     finishDate : {type:Date},
     user       : {
         type: Schema.Types.ObjectId,
         ref:'users'
     }
})


const Todos = mongoose.model('todos',TodosSchema);
module.exports = Todos;