// Express
const express = require('express');

// Router 
const router = express.Router();

// Home Controller
const homeController = require('../controller/homeController/homeController'); // Home

// Register Controller
const registerController = require('../controller/registerController/register'); // User Register

// Login Controller
const loginController = require('../controller/loginController/login'); // User Login

// Authentication
const userLoginAuth = require('../authentication/userLoginAuth');  // User Login Auth
const homeAuth = require('../authentication/homeAuth'); // Home Auth
const userRegisterAuth = require('../authentication/userRegisterAuth'); // User Registration Auth

// Logout Controller
const logoutController = require('../controller/logoutController/logoutController'); // User Logout

// Contact
const contactController = require('../controller/contactController/contactController');  // Contact

// User Home Page
const userHome = require('../controller/userHomeController/userHomeController');  // User Home

// User Certificates
const userCertificate = require('../controller/userCertificate/userCertificate'); // User Certificates
const editCerti = require('../controller/userCertificate/editCerti');             // Edit Certificates
const getDeleteCerti = require('../controller/userCertificate/getDeleteCerti'); // Delete Certificates

// Validate Certificate
const validateCertificate = require('../controller/validateCertificate/validateCertificate'); // Validate Certificate

// Multer
const upload = require('../controller/multerFile/multer');

// 1- Website Home Page
router.get('/', homeAuth, homeController.home);

// 2- Register
router.get('/register', userRegisterAuth, registerController.getRegister);
router.post('/register', registerController.postRegister);

// 3- Log In
router.get('/login', userLoginAuth, loginController.getLogin);
router.post('/login', loginController.postLogin);

// 4- User Logout
router.get('/logout', userLoginAuth, logoutController.getLogout);

// 5- Contact
router.post('/contact', contactController.contact);

// 6- User Home Page
router.get('/userHome', userLoginAuth, userHome.userHome);

// 7- Certificates
router.get('/userCerti', userLoginAuth, userCertificate.getUserCertificate);  // View Uploded Cerificates
router.post('/uploadCertificate', userLoginAuth, upload.single('single_input'), userCertificate.userCertificate); // Upload Certificates To DB

// 8- Edit Certificates
router.get('/editCerti', userLoginAuth, editCerti.getEditCerti);
router.post('/postEditCerti', upload.single('single_input'), userLoginAuth, editCerti.postEditCerti);
router.get('/deleteCerti', userLoginAuth, getDeleteCerti.getDeleteCerti)


router.get('/validateCerti', validateCertificate.validateCertificate);

// Invalid Routes
router.get('**', (req, res) => {
    res.redirect('/');
})

// Exporting Module
module.exports = router;