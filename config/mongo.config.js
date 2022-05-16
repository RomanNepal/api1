const e = require("express");
const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/mern";

mongoose.connect(dbUrl, {
    autoIndex: true,
    autoCreate: true
}, (err) => {
    if(err) {
        console.log("Error while connecting db...");
    } else {
        console.log("DB Connected successfully.");
    }
});