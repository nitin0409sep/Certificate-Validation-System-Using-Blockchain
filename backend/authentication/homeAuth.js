// JWT
const jwt = require('jsonwebtoken');

// User
const User = require('../models/user');

const homeAuth = async (req, res, next) => {

    try {  // If Logged In

        // Fetching token from browser
        const token = req.cookies.jwt;

        // Verifying Token
        const verifyToken = jwt.verify(token, "tokengeneratedusingjsonwebtoken");

        // User verification from DB
        const user = await User.findOne({ _id: verifyToken._id });

        if (user) {
            req.userData = user;   // Storing data so that we can access/pass it further
            next();
        }

    } catch (err) {
        // If not Logged In
        res.render('home');
    }
}

// Export homeAuth
module.exports = homeAuth;