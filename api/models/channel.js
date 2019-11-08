const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    name: String,
    image: String
});

module.exports = mongoose.model('Channel', channelSchema);