const  bodyparser  = require('body-parser');
const UserController = require('../controllers/user.controller');
let user_controller = new UserController();
let router = require('express').Router();
const express = require('express');
const uploader = require('../middleware/uploader.middleware');


router.route("/").get(user_controller.listAll);
router.route("/:id")
.put(user_controller.update)
.delete(user_controller.delete)
.get(user_controller.show)

module.exports=router;