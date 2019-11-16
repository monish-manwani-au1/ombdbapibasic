const mongoose = require('mongoose');
var integerValidator = require('mongoose-integer');
const Schema = mongoose.Schema;
const statusSchema = new Schema({
    
    code: {
        type     : Number,
        required : true,
        unique   : true,
        validate : {
                        validator : Number.isInteger,
                        message   : '{VALUE} is not an integer value'
                    }
    },

    name: {
        type: String,
        required: true
        
    },

   createAt: Date, 

   //createBy

   updateAt: Date
    
});

statusSchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });//mySchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });