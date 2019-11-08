const mongoose = require('mongoose');

const catagorySchema = mongoose.Schema({
    name: String,
    image: String
});

module.exports = mongoose.model('Category', catagorySchema);