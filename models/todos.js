const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TodosSchema = new Schema({
     title      : {
        type: String,
        required: true,
    },
     finishDate : {
        type:Date,
        required:true
    },
    user       : {
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    approve     :{
        type: Boolean,
        default: false
    },
    approveBy: {
        type: String,
        enum:['n/a','admin'],
        default: 'n/a'
    },
    status: {
        type: String,
        enum: ['pending','completed'],
        default: 'pending'
    }
},{timestamps:true})


const Todos = mongoose.model('todos',TodosSchema);
module.exports = Todos;