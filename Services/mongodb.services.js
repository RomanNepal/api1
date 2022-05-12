const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
// or as an es module:
// import { MongoClient } from 'mongodb'0

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
table = "merncollection";
dbName = "mern";
// Database Name

const dbConnection = (cb) => {
  // MongoClient.connect(url, (err, client) => {
  //       if (err) {
  //         cb({ status: 500, msg: "Error connecting database server" });
  //       } else {
  //         const db = client.db(dbName);
  //         cb(null, db);
  //       }
  //     });

  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        return reject({ status: 500, msg: "Error connecting database server" });
      } else {
        const db = client.db(dbName);
        return resolve(db);
      }
    });
  });
};

const checkUserExistence = (data) => {
  const db = client.db(dbName);
  dbConnection().then().catch();
};

const addUser = (table, data) => {
  return new Promise((resolve, reject) => {
    dbConnection()
      .then((db) => {
        db.collection(table)
          .insertOne(data)
          .then((ack) => {
            return resolve(ack);
          })
          .catch((err)=>{
            return reject(err);
          });
      })
      .catch((err) => {
        next({status: 500, msg:"Error connecting db"})
      });
  });

  // dbConnection()
  //   .then((db) => {
  //     db.collection(table)
  //       .insertOne(data)
  //       .then((data) => {
  //         console.log("User registered successfully");
  //       }).catch((err)=>{
  //         console.log("Error while inserting")
  //       });

  // .then((data)=>{
  //     res.json({
  //       status: 400,
  //       msg:"Email already registered"
  //     })
  // })
  // .catch();

  // console.log(emailFinded);
  //   if (emailFinded == data.email) {
  //     console.log("Error! User already registered");
  //   } else {

  // db.collection(table)
  //   .insertOne(data)
  //   .then(() => {
  //     console.log("User registered successfully");
  //   });
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

module.exports = { dbConnection, addUser };
