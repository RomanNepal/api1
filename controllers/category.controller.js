const CategoryModel = require("../models/category.model");
class CategoryController {
  addCategory = async (req, res, next) => {
    let data = req.body;
    try {
      if (req.file) {
        data.image = req.file.filename;
      }
        if (!data.brand || data.brand.length == 0) {
          data.brand = [];
        }
      let newcategory = await new CategoryModel(data);
      newcategory
        .save()
        .then((category) => {
          res.json({
            result: category,
            status: 200,
            msg: "Category added successfully",
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: err,
          });
        });
    } catch (err) {
      next({ status: 500, msg: JSON.stringify(err) });
    }
  };

  getAllCats = async (req, res, next) => {
    try {
      console.log("We are here");
      let category = await CategoryModel.find();
      if (category) {
        res.json({
          result: category,
          status: 200,
          msg: "All categories listed",
        });
      } else {
        res.json({
          status: 404,
          msg: "Category not found",
        });
      }
    } catch (err) {
      next({ status: 500, msg: "Error at getAllCats" });
    }
  };

  updateCategory = async (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    try {
      let response = await CategoryModel.findByIdAndUpdate(id, data);
      if (response) {
        res.json({
          result: response,
          status: 200,
          msg: "Category updated successfully",
        });
      } else {
        next({ status: 400, msg: err });
      }
    } catch (err) {
      next({ status: 500, msg: err });
    }
  };
}

module.exports = CategoryController;
