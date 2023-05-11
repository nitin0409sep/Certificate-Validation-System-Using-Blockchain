const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        unique: true
    },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
