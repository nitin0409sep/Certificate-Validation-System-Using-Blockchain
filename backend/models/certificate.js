// Mongoose
const mongoose = require('mongoose');

// Certificate Schema
const certiSchema = mongoose.Schema({
    user_id: {
        type: String,
    },
    name: {
        type: String,
    },
    rollNumber: {
        type: String,
    },
    certiId: {
        type: String,
    },
    img: {
        type: String,
    }

});


// Certificate Model
const Certificate = mongoose.model('Certificate', certiSchema);

// Export Certficate
module.exports = Certificate;
