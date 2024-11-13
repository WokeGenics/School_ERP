const mongoose = require('mongoose');

const ClassFeeSchema = new mongoose.Schema({
    class_name: {
        type: String,
        required: true
    },
    section: {
        type: String
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeeCategory'
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ClassFee', ClassFeeSchema);