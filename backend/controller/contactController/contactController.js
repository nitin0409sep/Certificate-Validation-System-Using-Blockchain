// Contact Model
const Contact = require('../../models/contact');

// Contact
module.exports.contact = async (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let comment = req.body.comment;

    try {

        const data = new Contact({
            name: name,
            email: email,
            phone: phone,
            comment: comment
        })

        // Save to DB
        const contact = await data.save();
        res.redirect('/');

    } catch (err) {
        res.status(404).send(err);
    }
}