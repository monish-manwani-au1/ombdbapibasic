const mongoose = require('mongoose');
var integerValidator = require('mongoose-integer');
const Schema = mongoose.Schema;
const enrollmentSchema = new Schema({
    
    userCode: {
        type:ObjectIdSchema, default: function () { return new ObjectId()}
    },

    enrolment: {
        type: String,
        required: true
        
    },
  
    createBy: {
        type: String,
        required: true
        
    },


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