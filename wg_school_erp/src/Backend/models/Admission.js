// models/Admission.js
const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    admission_class: {
        type: String,
        required: true
    },
    promoted_class: {
        type: String,
        require: true
    },
    admission_date: {
        type: Date,
        required: true
    },
    form_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    form_buyer_name: {
        type: String
    },
    form_selling_count: {
        type: Number
    },
    entrance_exam_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EntranceExam'
    }
});

module.exports = mongoose.model('Admission', AdmissionSchema);
