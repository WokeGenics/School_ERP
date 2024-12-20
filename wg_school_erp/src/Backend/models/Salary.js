const mongoose = require('mongoose');


const SalarySchema = new mongoose.Schema({
    Roll :{
        require: true,
        type: String
    },
    name: {
        type: String,
        require: true
    },
    Amout:{
        type: Number,
        require: true
    },
    Status:{
        type: Boolean,
        require: true
    },
    phoneNumber:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    AccountNumber:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Salary', SalarySchema);