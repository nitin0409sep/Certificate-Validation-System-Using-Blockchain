// User
const User = require('../../models/user');

// bcrypt
const bcrypt = require('bcryptjs');

// GET Req  - User Already Logged In
module.exports.getLogin = (req, res) => {
    res.render('userHome');
}

// POST Req
module.exports.postLogin = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });

        // Email is not valid
        if (user == null) {
            throw new Error("Invalid Credentials");
        } else {

            // Decrypt and Matching the password
            let isMatch = await bcrypt.compare(password, user.password);

            // Comparing Passwords
            if (isMatch) {

                // JWT Token
                const token = await user.generateAuthToken();

                // Cookie
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 800000)
                })

                res.redirect('userHome')
            } else {
                throw new Error("Invalid Credentials");
            }
        }
    } catch (err) {
        res.redirect('/login');
    }
}