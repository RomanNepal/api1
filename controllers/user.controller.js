const mongo = require("mongodb");
const ObjectId = mongo.ObjectId;
const {
  deleteRecord,
  dbConnection,
  addRecord,
  updateRecord,
  getRecord,
} = require("../Services/mongodb.services");
class UserController {
  

  update = (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    updateRecord("merncollection", { _id: ObjectId(req.params.id) }, data)
      .then((ack) => {
        res.json({
          result: ack,
          status: true, 
          msg:"User updated successfully"
        })
      })
      .catch((err)=>{
        next({status: 500, msg:err});
      });
    
  };

  delete = (req, res, next) => {
    deleteRecord('merncollection',{_id: ObjectId(req.params.id)}).then((data)=>{
      res.json({
        result: data,
        status: 200, 
        msg:"User deleted successfully"
      })
    }).catch((err)=>{
      res.json({
        result: err,
        status: 400,
        msg:"User could not be deleted, maybe id is wrong"
      })
    })
    
  };

  show = (req, res, next) => {
    getRecord('merncollection', {_id: ObjectId(req.params.id)}).toArray().then((result)=>{
      res.json({
        result: result,
        status: 200, 
        msg:"User data shown"
      })
    }).catch((error)=>{
      res.json({
        result: error,
        status: 400,
        msg:"User not found"
      })
    })
    
  };

  listAll = (req, res, next) => {
    let abc = req.body
    getRecord("merncollection")
      .then((response) => {
        res.json({
          result: response,
          status: true,
          msg: "Fetched user data",
        });
      })
      .catch((error) => {
        res.json({
          status: 500,
          msg:"Error in list all"
        })
        // next({status: 500, msg:error});
      });
  };
}
module.exports = UserController;
