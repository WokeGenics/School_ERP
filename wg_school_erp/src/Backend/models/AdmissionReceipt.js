const mongoose = require('mongoose');

const AdmissionReceiptSchema = new mongoose.Schema({
    admission_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admission',
        required: true
    },
    accessories_charges: {
        type: Number
    },
    books_charges: {
        type: Number
    },
    copy_charges: {
        type: Number
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

module.exports = mongoose.model('AdmissionReceipt', AdmissionReceiptSchema);