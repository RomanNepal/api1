const  bodyparser  = require('body-parser');
const UserController = require('../controllers/user.controller');
let usercontroller = new UserController();
let router = require('express').Router();
const express = require('express');
const uploader = require('../middleware/uploader.middleware');
const app = express();


router.route('/').get(usercontroller.listAll)
router.route("/:id")
.put(uploader.single('image'), usercontroller.update)
.delete(usercontroller.delete)
.get(usercontroller.show)

module.exports=app;