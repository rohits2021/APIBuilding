const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({  
    email : {
        type : String,
        required: true,
        lowercase: true,
    },
    password  : {
        type:String,
        required: true,
    },
    todos : [{
        type: Schema.Types.ObjectId,
        ref:'todos',
    }]    
})

// usersSchema.pre('save',async function (next) {
//     try{
//         let salt = await bcrypt.genSalt(10);
//         let hashedPassword = await bcrypt.hash(this.password,salt);
//         this.password = hashedPassword;
//       } catch (error) {
//         next(error)
//       } 
// })
const Users = mongoose.model('users',usersSchema);
module.exports = Users;