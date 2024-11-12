const mongoose = require('mongoose');

const StudentCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('StudentCategory', StudentCategorySchema);