const router = require("express").Router();
const LabelController = require("../controllers/label.controller");
let label_controller = new LabelController();
const uploader = require("../middleware/uploader.middleware");
const IsLoggedIn = require("../middleware/logincheck.middleware");

router
  .route("/")
  .get(label_controller.labelList)
  .post(IsLoggedIn ,uploader.single("image"), label_controller.labelAdd);

router
  .route("/:id")
  .put(uploader.single("image"),label_controller.labelUpdate)
  .post(IsLoggedIn,(req, res, next) => {
    // let id = req.params.id;
    // brand.map((item, index) => {
    //   if (item.id == id) {
    //     res.json(item);
    //   }
    // });
    // next("err");
  })
  .delete(label_controller.labelDelete);

module.exports = router;
