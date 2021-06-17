const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
   
    email     : {
        type : String,
        required: true,
        lowercase: true,
    },
    salt  : {
        type : String,
        required: true,
    },
    hash : {
        type:String,
        required: true,
    }
    
})

const Users = mongoose.model('users',usersSchema);
module.exports = Users;