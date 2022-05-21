const mongo = require("mongodb");
const ObjectId = mongo.ObjectId;
const {
  deleteRecord,
  dbConnection,
  addRecord,
  updateRecord,
  getRecord,
} = require("../Services/mongodb.services");
const User = require("../models/user.model");
class UserController {
  update = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    User.findByIdAndUpdate(req.params.id, {
      $set: data,
    })
      .then((ack) => {
        res.json({
          result: ack,
          status: true,
          msg: "User updated successfully",
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "User could not be updated",
        });
      });
  };

  delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
      .then((ack) => {
        res.json({
          result: ack,
          status: 200,
          msg: "User deleted successfully",
        });
      })
      .catch((err) => {
        res.json({
          result: err,
          status: 400,
          msg: "User could not be deleted, maybe id is wrong",
        });
      });
  };

  show = async (req, res, next) => {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      res.json({
        result: user,
        status: 200,
        msg: "User data shown",
      });
    } else {
      res.json({
        result: error,
        status: 400,
        msg: "User not found",
      });
    }
  };

  listAll = (req, res, next) => {
    User.find({})
      .then((result) => {
        res.json({
          result: result,
          status: true,
          msg: "Fetched user data",
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: err,
        });
      });
  };
}
module.exports = UserController;
