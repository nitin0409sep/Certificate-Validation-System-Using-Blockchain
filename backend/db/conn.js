const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1/prac_blockchain_user").then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.log("Database Connection Error");
})  
