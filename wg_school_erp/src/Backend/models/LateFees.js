const mongoose = require('mongoose');

const LateFeeSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    fee_receipt_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeeReceipt',
        required: true
    },
    late_fee_amount: {
        type: Number,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    payment_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid'],
        required: true
    }
});

module.exports = mongoose.model('LateFee', LateFeeSchema);