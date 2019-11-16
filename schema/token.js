const mongoose = require('mongoose');
var integerValidator = require('mongoose-integer');
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    
    code: {
        type:ObjectIdSchema, default: function () { return new ObjectId()}
    },

    name: {
        type: String,
        required: true
        
    },
  
    customerId: {
        type: String,
        required: true
        
    },

 branchId: {
        type: String,
        required: true
        
    },

serviceId: {
        type: String,
        required: true
        
    },

number: {
      type:Number,
      required:true
},

createBy: {
      type:String,
      required:true
}

    updateAt: Date,

    statusCode: {
        type     : Number,
        required : true,
        unique   : true,
        validate : {
                        validator : Number.isInteger,
                        message   : '{VALUE} is not an integer value'
                    }
    },

    tokenStatusCode: {
        type     : Number,
        required : true,
        unique   : true,
        validate : {
                        validator : Number.isInteger,
                        message   : '{VALUE} is not an integer value'
                    }
    },

    counterId: {
        type: String,
        required: true
        
    }


    
});

statusSchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });//mySchema.plugin(integerValidator, { message: 'Error, expected {PATH} to be an integer.' });