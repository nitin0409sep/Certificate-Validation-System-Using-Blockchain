// Model
const Certificate = require('../../models/certificate');

// FS Module 
const fs = require('fs');

// Path Module
const path = require('path');

// Delete Req
module.exports.getDeleteCerti = async (req, res) => {
    try {

        // Getting User ID From Middleware User Auth
        let user_id = req.userData.id;

        // Finding the img in DB which user want to delete
        const data = await Certificate.findOneAndDelete({ user_id: user_id }, {
            new: true
        });

        // Certificate Image's Local DB
        const pathImg = path.join(__dirname, `../../../frontend/public/userCertificataes/${data.img}`);

        // Deleting File From Local Storage Too
        fs.unlink(pathImg, (err) => {
            if (err) {
                throw new Error("Cant delete from local Storage");
            }
        })

        // Render userCerti Page
        res.redirect('userCerti');

    } catch (err) {
        res.status(404).send("Delete Certificate " + err);
    }

}