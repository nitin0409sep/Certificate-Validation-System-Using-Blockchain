// Mongoose
const mongoose = require('mongoose');

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    comment: {
        type: String,
    }
});

// Contact Model
const Contact = new mongoose.model("Contact", contactSchema);

// Export Model
module.exports = Contact;
