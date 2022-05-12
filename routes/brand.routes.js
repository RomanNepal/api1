const router = require("express").Router();
const { brandAdd, brandList } = require("../controllers/brand.controller");
const uploader = require("../middleware/uploader.middleware");
const IsLoggedIn = require("../middleware/logincheck.middleware");
let brand = [
  {
    id: 1,
    name: "acer",
    country: "usa",
  },
  {
    id: 2,
    name: "asus",
    country: "germany",
  },
  {
    id: 3,
    name: "hp",
    country: "china",
  },
];

router
  .route("/")
  .get((req, res, next) => {
    res.json(brand);
    next("error message");
  })
  .post(uploader.array("image"), brandAdd);

router
  .route("/:id")
  .put((req, res, next) => {})
  .post((req, res, next) => {
    let id = req.params.id;
    brand.map((item, index) => {
      if (item.id == id) {
        res.json(item);
      }
    });
    next("err");
  })
  .delete((req, res, next) => {});

module.exports = router;
