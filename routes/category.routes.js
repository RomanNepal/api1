const router = require('express').Router();
const Cat_controller = require('../controllers/category.controller')
let cat_controller = new Cat_controller()
const uploader = require('../middleware/uploader.middleware')
router.route('/')
.get(cat_controller.getAllCats)
.post(uploader.single('image') ,cat_controller.addCategory)

router.route('/:id')
.put(uploader.single('image'),cat_controller.updateCategory);

module.exports = router;