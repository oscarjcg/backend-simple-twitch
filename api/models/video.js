const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    title: String,
    url: String,
    //channelId
});

module.exports = mongoose.model('Video', videoSchema);