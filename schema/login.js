const mongoose = require('mongoose');
var integerValidator = require('mongoose-integer');
const Schema = mongoose.Schema;
const loginSchema = new Schema({
    
    userCode: {
        type:ObjectIdSchema, default: function () { return new ObjectId()}
    },

    username: {
        type: String,
        required: true
        
    },

   lastName: {
        type: String,
        required: true
        
    },

    Gender:{
        type: String,
        enum : {
            values : ['male', 'female', 'third gender'],
            message : '{PATH} with {VALUE} is not correct.'
        }
        required: true 
    },

  
    createBy: {
        type: String,
        required: true
        
    },

    
    updateAt: Date



    
});

statusSchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });//mySchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });