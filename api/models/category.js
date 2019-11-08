const mongoose = require('mongoose');

const catagorySchema = mongoose.Schema({
    name: String,
    image: { data: Buffer, contentType: String}
});

module.exports = mongoose.model('Category', catagorySchema);