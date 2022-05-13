const {
  dbConnection,
  addRecord,
  updateRecord,
  getRecord,
} = require("../Services/mongodb.services");
class UserController {
  user;
  setUser = (user) => {
    this.user = user;
  };
  update = (req, res, next) => {
    res.json({
      result: null,
      status: true,
      msg: "User updated",
    });
  };

  delete = (req, res, next) => {
    res.json({
      result: null,
      status: true,
      msg: "User deleted",
    });
  };

  show = (req, res, next) => {
    let user = {};
    this.setUser(user);
    res.json({
      result: null,
      status: true,
      msg: "User data",
    });
  };

  listAll = (req, res, next) => {
    getRecord("merncollection").then((response)=>{
        res.json({
            result: response,
            status: true,
            msg:"Fetched user data"
        })
    }).catch((error)=>{
        next({status: 500, msg: error})
    });
  };
}
module.exports = UserController;
