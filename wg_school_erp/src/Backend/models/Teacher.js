// models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  idNo: { type: String },
  bloodGroup: { type: String, required: true },
  religion: { type: String, required: true },
  email: { type: String },
  class: { type: String, required: true },
  section: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  bio: { type: String },
  images:[{
    public_id:{
        type:String,
        required:true,
        
    },
     url:{
        type:String,
        required:true,
        
    }
}],
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
