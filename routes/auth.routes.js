const express = require("express");
let AuthController = require("../controllers/auth.controllers");
let auth_controller = new AuthController();
const app = express();
const uploader = require("../middleware/uploader.middleware");
const bodyParser = require('body-parser');


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post("/login", uploader.single("image"), auth_controller.login);
app.post("/register", uploader.single("image"), auth_controller.register);
app.post("/update", uploader.single('image'), auth_controller.update)
module.exports = app;