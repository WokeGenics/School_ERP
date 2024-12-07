const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    bloodGroup: {
        type: String,
        require: true
    },
    religion: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    section:{
        type: String,
        required: true
    },
    admissionId:{
        type: String,
    },
    phone:{
        type: String,
    },
    roll:{
        type:String,
    },
    bio:{
        type: String,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentCategory'
    }
});
module.exports = mongoose.model('Student', StudentSchema);