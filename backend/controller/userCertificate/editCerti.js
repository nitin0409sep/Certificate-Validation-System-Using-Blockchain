// Model
const Certificate = require('../../models/certificate');


// GET Req
module.exports.getEditCerti = async (req, res) => {

    try {

        // Getting User ID From Middleware User Auth
        let user_id = req.userData.id;

        const data = await Certificate.findOne({ user_id: user_id });

        res.render('editCerti', {
            data: data,
        });
    } catch (err) {
        res.status(404).send("Edit Certificate Error " + err);
    }
}

// POST Req 
module.exports.postEditCerti = async (req, res) => {
    try {
        // Getting User ID From Middleware User Auth
        let user_id = req.userData.id;

        let name = req.body.name;
        let rollNumber = req.body.rollNumber;
        let certiId = req.body.certiId;
        let img = req.file.filename;

        // Checking Duplicate Name of Img is Existing Or Not
        const findImg = await Certificate.findOne({ img: img });
        if (findImg) {
            throw new Error("Please enter a new img name...");
        }

        // Create new Certificate Model to Save in DB
        const data = await Certificate.findOneAndUpdate({ user_id: user_id }, {
            $set: {
                user_id: user_id,
                name: name,
                rollNumber: rollNumber,
                certiId: certiId,
                img: img
            },
        }, {
            new: true
        })

        // After Update Redirect To Admin Login Page
        res.cookie("user", 'token', { maxAge: 1 });

        // Render userCerti Page
        res.redirect('userCerti');
    } catch (err) {
        res.status(404).send("User Certificate Upload Error " + err);
    }

}