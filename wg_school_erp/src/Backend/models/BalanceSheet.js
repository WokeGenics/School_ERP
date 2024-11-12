const mongoose = require('mongoose')

const BalanceSheetSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    total_assets: {
        type: Number,
        required: true
    },
    total_liabilities: {
        type: Number,
        required: true
    },
    profit_and_loss: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('BalanceSheet', BalanceSheetSchema);