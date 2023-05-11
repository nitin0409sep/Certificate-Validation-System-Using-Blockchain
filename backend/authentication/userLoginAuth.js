// JWT
const jwt = require('jsonwebtoken');

// User
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        // Fetching token from browser
        const token = req.cookies.jwt;

        // Verifying Token
        const verifyToken = jwt.verify(token, "tokengeneratedusingjsonwebtoken");

        // User verification from DB
        const user = await User.findOne({ _id: verifyToken._id });

        if (user) {
            req.userData = user;   // Storing data so that we can access/pass it further
            next();
        } else {
            throw new Error("Error");
        }

    } catch (err) {
        res.render('login');
    }


}

module.exports = userAuth;