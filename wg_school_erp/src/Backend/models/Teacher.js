// models/Admission.js
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    DateOfBirth:{
        type:Date,
        required:true
    },
    IdNo:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Religion:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    ShortBio:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Teacher', TeacherSchema);
