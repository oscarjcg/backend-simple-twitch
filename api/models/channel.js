const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    name: String,
    image: { data: Buffer, contentType: String},
    preview: { data: Buffer, contentType: String}
});

module.exports = mongoose.model('Channel', channelSchema);