const  bodyparser  = require('body-parser');
const UserController = require('../controllers/user.controller');
let user_controller = new UserController();
let router = require('express').Router();
const uploader = require('../middleware/uploader.middleware');


router.route("/").get(uploader.single('image'),user_controller.show);
router.route('/all').get(uploader.single('image'),user_controller.listAll)
router.route("/:id")
.put(uploader.single('image'),user_controller.update)
.delete(uploader.single('image'),user_controller.delete)
.get(uploader.single('image'),user_controller.show)

module.exports=router;