// Multer
const multer = require('multer');

// Path
const path = require('path');

// Certificates Storage Destination
const userCertificataesPath = path.join(__dirname, '../../../frontend/public/userCertificataes');

// Storage Setting
let storage = multer.diskStorage({
    destination: userCertificataesPath,
    filename: (req, file, cb) => {                   // cb - Callback
        cb(null, file.originalname);   // Image File Name
    }
})


// Upload Setting
let upload = multer({
    storage: storage
})


// Export Upload
module.exports = upload;