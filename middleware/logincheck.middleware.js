const jwt = require("jsonwebtoken");
const CONSTANTS = require("../config/constants");
const User = require("../models/user.model");
const IsLoggedIn = (req, res, next) => {
  let token = "";
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
  }

  if (req.headers["x-xsrf-token"]) {
    token = req.headers["x-xsrf-token"];
  }

  if (req.query["token"]) {
    token = req.query["token"];
  }
  if (token) {
    let parts = token.split(" ");
    if (parts.length > 1) {
      token = parts[parts.length - 1];
    } else {
      token = parts[0];
    }

    let data = jwt.verify(token, CONSTANTS.JWT_SECRET);
    if (data) {
      User.findById(data.id)
        .then((user) => {
          if (user) {
            req.auth_user = user;
            next();
          } else {
            next({
              status: 403,
              msg: "User doesn't exist anymore",
            });
          }
        })
        .catch((err) => {
          res.json({
            status: 403,
            msg: err,
          });
        });
    } else {
      next({
        status: 403,
        msg: "Invalid token or token expired",
      });
    }
  } else {
    next({
      status: 403, //unauthorized access
      msg: "Unauthorized access",
    });
  }
  console.log(token);
};
module.exports = IsLoggedIn;
