const Joi = require('joi');

const  authSchema = Joi.object().keys({
    email:    Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required()
})

module.exports = {
    authSchema
}





// module.exports = {
    // validateParam : (schema,name) => {
    //     return (req,res,next) => {
    //         console.log('req-params',req.params);
    //     }
    // },
//     validateBody : (schema) => {
//         return (req,res,next) => {
//             const result = Joi.valid(req.body,schema);
            
//             if(result.error){
                
//                 return res.status(400).json(result.error)
//             }
//             if(!req.value){ 
                
//                 req.value = {};
//             }
//             req.value['body'] = result.value
            
//         }       
//     },

//     schemas: {
       
//     }
// }