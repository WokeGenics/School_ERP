const mongoose = require('mongoose');

const EntranceExamSchema = new mongoose.Schema({
    exam_name: {
        type: String,
        required: true
    },
    exam_date: {
        type: Date,
        required: true
    },
    result_status: {
        type: Boolean,
        required: true
    }
});



module.exports = mongoose.model('EntranceExam', EntranceExamSchema);
