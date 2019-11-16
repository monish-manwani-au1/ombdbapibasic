const mongoose = require('mongoose');
var integerValidator = require('mongoose-integer');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    
    code: {
        type:ObjectIdSchema, default: function () { return new ObjectId()}
    },

    firstName: {
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

    DOB: {
    type: Date
   },

   mobileNumber:{
    country_code: String,
    number: String,
    required:true
 
   },

   emailId: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
        
    },

    createAt: Date, 
    
    updateAt: Date,

    statusCode: {
        type     : Number,
        required : true,
        unique   : true,
        validate : {
                        validator : Number.isInteger,
                        message   : '{VALUE} is not an integer value'
                    }
    }



    
});

statusSchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });//mySchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });