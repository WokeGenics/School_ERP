const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
    bank_name: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true
    },
    branch_name: {
        type: String
    }
});

module.exports = mongoose.model('Bank', BankSchema);