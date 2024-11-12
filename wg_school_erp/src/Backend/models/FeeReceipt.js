const mongoose = require('mongoose');

const FeeReceiptSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    fee_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeeCategory',
        required: true
    },
    fee_payment_type: {
        type: String,
        enum: ['cash', 'online'],
        required: true
    },
    receipt_date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('FeeReceipt', FeeReceiptSchema);