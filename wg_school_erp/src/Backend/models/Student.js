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
    dob: {
        type: Date,
        required: true
    },
    BloodGroup: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        require: true
    },
    class:{
        type: String,
        required: true
    },
    section:{
        type: String,
        required: true
    },
    Short_Bio:{
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentCategory'
    }
});
module.exports = mongoose.model('Student', StudentSchema);