const mongo = require("mongodb");
const ObjectId = mongo.ObjectId;
const Label = require("../models/label.model");
const SVC = require("../Services/label.services");
let svc = new SVC();
class LabelController {
  labelAdd = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    try {
      let success = await svc.addLabel(data);
      if (success) {
        res.json({
          result: success,
          status: 200,
          msg: "Label created successfully",
        });
      } else {
        next({ status: 400, msg: "Error while creating label" });
      }
      // let newBrand = new Label(data);
      // newBrand
      //   .save()
      //   .then((result) => {
      //     res.json({
      //       result: result,
      //       status: 200,
      //       msg: "Brand added successfully",
      //     });
      //   })
      //   .catch((err) => {
      //     next({ status: 500, msg: err });
      //   });
    } catch (error) {
      next({ status: 500, msg: JSON.stringify(error) });
    }
  };
  labelUpdate = async (req, res, next) => {
    try {
      let id = req.params.id;
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      let response = await Label.findByIdAndUpdate(id, data);
      console.log(response);
      if (response) {
        res.json({
          result: response,
          status: 200,
          msg: "Category updated successfully",
        });
      }
    } catch (err) {
      next({ status: 500, msg: err });
    }
  };
  labelList = async (req, res, next) => {
    try {
      let label = await Label.find();
      if (label) {
        res.json({
          result: label,
          status: 200,
          msg: "Labels shown successfully",
        });
      } else {
        next({ status: 404, msg: "No labels in database" });
      }
    } catch (err) {
      next({ status: 500, msg: err });
    }
  };
  labelDelete = async (req, res, next) => {
    let result = await Label.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({
        result: result,
        status: 200,
        msg: "Label deleted successfully",
      });
    } else {
      res.json({
        status: 400,
        msg: "Label could not be deleted",
      });
    }
  };
}

module.exports = LabelController;
