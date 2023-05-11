// User
const User = require('../../models/user');

// GET Req  - User Already Logged In
module.exports.getRegister = (req, res) => {
    res.render("userHome");
}

// POST Req
module.exports.postRegister = async (req, res) => {

    // Getting data from the form
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password === cpassword) {
        try {

            // Creating new User
            const user = new User({
                name: name,
                email: email,
                password: password,
            })

            // JWT Token
            const token = await user.generateAuthToken();

            // Cookie
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 800000)
            })

            // Save User to DB
            const data = await user.save();

            // Redirect to User Page
            res.redirect('userHome');
        } catch (err) {
            res.redirect('/register');
        }
    } else {
        // Redirect to Register Page
        res.redirect('/register');
    }

}