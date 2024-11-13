const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    parent_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: String
    }
});

module.exports = mongoose.model('Parent', ParentSchema);