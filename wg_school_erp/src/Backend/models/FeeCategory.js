const mongoose = require('mongoose');

const FeeCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    monthly: {
        type: Number
    },
    quarterly: {
        type: Number
    },
    annually: {
        type: Number
    }
});

module.exports = mongoose.model('FeeCategory', FeeCategorySchema);