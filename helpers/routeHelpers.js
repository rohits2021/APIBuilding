const Joi = require('joi');

module.exports = {
    // validateParam : (schema,name) => {
    //     return (req,res,next) => {
    //         console.log('req-params',req.params);
    //     }
    // },
    validateBody : (schema) => {
        return (req,res,next) => {
            const result = Joi.valid(req.body,schema);
            
            if(result.error){
                
                return res.status(400).json(result.error)
            }
            if(!req.value){ 
                
                req.value = {};
            }
            req.value['body'] = result.value
            
        }       
    },

    schemas: {
        authSchema: Joi.object().keys({
            email:    Joi.string().email().required(),
            password: Joi.string().required()
        })
    }

}