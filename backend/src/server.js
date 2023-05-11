// Express
const express = require('express');

// App
const app = express();

// Port
const port = process.env.PORT || 80;

// DB
require('../db/conn');

// Path
const path = require('path');

// HBS
const hbs = require('hbs');

// Router
const route = require('../router/routes');

// cookie Parser
const cookieParser = require('cookie-parser');

// Tell express u r using it
app.use(cookieParser());   // using as a middleware to fetch cookies from client browser

// Static Files Path
const staticPath = path.join(__dirname + '../../../frontend/public');

// Views Home Directory
const home_views_path = path.join(__dirname, '../../frontend/temp/home');

// Views User Directory
const user_views_path = path.join(__dirname, '../../frontend/temp/user')

// Partials Directory
const partials_path = path.join(__dirname, '../../frontend/temp/partials')

// Staic Directory Middleware
app.use('/public', express.static(staticPath));

// Middleware to parse data coming from client side 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// HBS
app.set('view engine', 'hbs');

// Set view engine path
app.set('views', [
    home_views_path,
    user_views_path
]);

// Partials
hbs.registerPartials(partials_path);

// Routes
app.use(route);

// PORT 
app.listen(port, () => {
    console.log(`Server has started at port - ${port}`);
});