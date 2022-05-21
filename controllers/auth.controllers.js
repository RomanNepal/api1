// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
const {
  dbConnection,
  addRecord,
  updateRecord,
  getRecord,
} = require("../Services/mongodb.services.js");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../config/constants");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// const url = "mongodb://localhost:27017";
// const client = new MongoClient(url);

// Database Name
const dbName = "mern";
const table = "merncollection";

class AuthController {
  login = async (req, res, next) => {
    let data = req.body;
    console.log(data);
    try {
      console.log(data);
      let user = await User.findOne({
        email: data.email,
      });
      if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          let result = {
            token: this.generateToken({
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            }),
            user: user,
          };

          res.json({
            result: result,
            status: true,
            msg: "Logged in successfully",
          });
        } else {
          res.json({
            status: false,
            msg: "Password doesn't match",
          });
        }
      } else {
        res.json({
          result: null,
          status: false,
          msg: "User not found",
        });
      }
    } catch (err) {
      // console.log("user is", user);
      // if (user) {

      //   if (bcrypt.compareSync(data.password, user.password)) {
      //     res.json({
      //       result: result,
      //       status: true,
      //       msg: "Logged in successfully",
      //     });
      //   }
      //   else{
      //     res.json({
      //       status: false,
      //       msg:"Password doesn't match"
      //     })
      //   }
      // } else {
      //   res.json({
      //     result: null,
      //     status: false,
      //     msg: "User not found",
      //   });
      // }
      console.log(err);
      res.json({
        status: 500,
        msg: err,
      });
    }

    //db query before response
    // this is for promise handling which was giving me error like hell Note: This error was due to .findOne() which is not the way to go. Instead always use .find() only and only
    // dbConnection()
    //   .then((db) => {
    //     db.collection("merncollection")
    //       .find({ email: data.email })
    //       .toArray()
    //       .then((users) => {
    //         if (users.length) {
    //           res.json({
    //             result: users,
    //             status: true,
    //             msg: "User logged in successfully",
    //           });
    //         } else {
    //           res.json({
    //             result: null,
    //             status: false,
    //             msg: "User not found",
    //           });
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         res.json({
    //           result: null,
    //           status: false,
    //           msg: "User Not found",
    //         });
    //       });
    //   })
    //   .catch((err) => {
    //     next({ msg: "Error connecting database" });
    //   });

    //this is using callback
    // dbConnection((err, db)=>{
    //   if(err){
    //     next(err)
    //   }
    //   else if(db){

    //     db.collection('merncollection')
    //       .find({ email: data.email })
    //       .toArray()
    //       .then((users) => {
    //         if (users.length) {
    //           res.json({
    //             result: users,
    //             status: true,
    //             msg: "User logged in successfully",
    //           });
    //         } else {
    //           res.json({
    //             result: null,
    //             status: false,
    //             msg: "User not found"
    //           });
    //         }
    //       })
    //       .catch((err)=>{
    //         console.log(err);
    //         res.json({
    //           result: null,
    //           status: false,
    //           msg:"User Not found"
    //         })
    //       });
    //   }
    // })

    // MongoClient.connect(url,(err, client)=>{
    //     if(err){
    //       next({status: 500, msg:"Error connecting database"});
    //     }
    //     else{
    //       const db = client.db(dbName);
    //       db.collection('merncollection').find({
    //         email: data.email
    //       }).toArray().then((users)=>{
    //           if(users.length){
    //             res.json({
    //               result: users,
    //               status: true,
    //               msg:"User logged in successfully"
    //             })
    //           }
    //           else{
    //             res.json({
    //               result: null,
    //               status: false,
    //               msg:"User not found"
    //             })
    //           }
    //       }).catch((err)=>{
    //         console.log(err);
    //         next({status: 500, msg:"Error while connecting db"})
    //       })
    //     }
    // })

    // next({ status: 400, msg: err });

    // if (result.email == data.email) {
    //   res.json({
    //     result: data,
    //     status: true,
    //     msg: "User logged in successfully",
    //   });
    // } else {
    //   res.json({
    //     status: 400,
    //     msg: "Invalid email",
    //   });
    // }

    // .catch(() => {
    //   next({ status: 400, msg: "Email not found" });
    // });

    // .catch();
    // console.log(emailFinded);
    //   if (emailFinded == data.email) {
    //     console.log("Error! User already registered");
    //   } else {

    // console.log('we are logged in')
    // console.log(data)
    // if (req.file){
    //   data.image = req.file.filename;
    // }
  };
  register = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }

    try {
      // let user = await getRecord('users', { email: data.email });

      let user = await User.findOne({
        email: data.email,
      });
      if (user) {
        next({ status: 400, msg: "Email already taken" });
      } else {
        // data['password']
        data["password"] = bcrypt.hashSync(data["password"], 10);

        let user = new User(data);
        // addRecord('users', data)
        user
          .save()
          .then((response) => {
            res.json({
              result: response,
              status: true,
              msg: "User registered successfully",
            });
          })
          .catch((error) => {
            next(error);
          });
      }
    } catch (error) {
      next(error);
    }
  };
  generateToken = (data) => {
    let token = jwt.sign(data, CONSTANTS.JWT_SECRET);
    return token;
  };
  // console.log(req.file);
  // database query before response
  //   dbConnection()
  //     .then((db) => {
  //       db.collection(table)
  //         .find({ email: data.email })
  //         .toArray()
  //         .then((users) => {
  //           if (users.length) {
  //             res.json({
  //               status: 400,
  //               msg: "Email already in use",
  //             });
  //           } else {
  //             addRecord("merncollection", data)
  //               .then((ack) => {
  //                 res.json({
  //                   result: ack,
  //                   status: 200,
  //                   msg: "User inserted successfully",
  //                 });
  //               })
  //               .catch((err) => {
  //                 res.json({
  //                   status: 400,
  //                   msg: err,
  //                 });
  //               });
  //           }
  //         })
  //         .catch((err) => {
  //           res.json({
  //             status: 400,
  //             msg: err,
  //           });
  //         });
  //     })
  //     .catch((err) => {
  //       next({ status: 500, msg: "Error connecting db" });
  //     });
}

module.exports = AuthController;
