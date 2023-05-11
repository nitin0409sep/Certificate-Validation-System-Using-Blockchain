// Mongoose
const mongoose = require('mongoose');

// Validator
const validator = require('validator');

// bcrypt -: Hash Password
const bcrypt = require('bcryptjs');

// JWT
const jwt = require('jsonwebtoken');


// User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
})


// Hashing Password
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    } catch (err) {
        console.log(err);
    }
    next();
})


// Generating Token
userSchema.methods.generateAuthToken = async function (req, res) {
    try {
        // JWT
        let token = jwt.sign({ _id: this._id }, "tokengeneratedusingjsonwebtoken");
        return token;
    } catch (err) {
        res.send("Generate Token Error " + err);
    }
}

// User Model
const User = mongoose.model('User', userSchema);

// Exporting User
module.exports = User;