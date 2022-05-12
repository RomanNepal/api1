// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
const { dbConnection, addUser } = require("../Services/mongodb.services.js");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// const url = "mongodb://localhost:27017";
// const client = new MongoClient(url);

// Database Name
const dbName = "mern";
const table = "merncollection";

class AuthController {
  login = (req, res, next) => {
    let data = req.body;
    //db query before response
    // this is for promise handling which was giving me error like hell Note: This error was due to .findOne() which is not the way to go. Instead always use .find() only and only
    dbConnection()
      .then((db) => {
        db.collection("merncollection")
          .find({ email: data.email })
          .toArray()
          .then((users) => {
            if (users.length) {
              res.json({
                result: users,
                status: true,
                msg: "User logged in successfully",
              });
            } else {
              res.json({
                result: null,
                status: false,
                msg: "User not found",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({
              result: null,
              status: false,
              msg: "User Not found",
            });
          });
      })
      .catch((err) => {
        next({ msg: "Error connecting database" });
      });

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
  register = (req, res, next) => {
    let data = req.body;
    console.log("we are here");
    console.log(data);
    if (req.file) {
      data.image = req.file.filename;
    }
    // console.log(req.file);
    // database query before response
    dbConnection()
      .then((db) => {
        db.collection(table)
          .find({ email: data.email })
          .toArray()
          .then((users) => {
            if (users.length) {
              res.json({
                status: 400,
                msg: "Email already in use",
              });
            } else {
              addUser("merncollection", data).then((ack)=>{
                res.json({
                  result: ack,
                  status: 200,
                  msg: "User inserted successfully",
                });
              }).catch((err)=>{
                res.json({
                  status: 400,
                  msg:err
                })
              })
            }
          })
          .catch((err) => {
            res.json({
              status: 400,
              msg: err
            })
          });
      })
      .catch((err)=>{
        next({status: 500, msg:"Error connecting db"})
      });
  };
}
module.exports = AuthController;
