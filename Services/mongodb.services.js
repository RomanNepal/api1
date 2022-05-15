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

const dbConnection = () => {
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

const addRecord = (table, data) => {
  return new Promise((resolve, reject) => {
    dbConnection()
      .then((db) => {
        db.collection(table)
          .insertOne(data)
          .then((ack) => {
            return resolve(ack);
          })
          .catch((err) => {
            return reject(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const updateRecord = (tablename, myquery, data) => {
  return new Promise((resolve, reject) => {
    dbConnection()
      .then((db) => {
        db.collection(tablename)
          .updateMany(myquery, { $set: data })
          .then((ack) => {
            return resolve(ack);
          })
          .catch((err) => {
            return reject({ status: 500, msg: err });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getRecord = (table, filter) => {
  return new Promise((resolve, reject) => {
    dbConnection()
      .then((db) => {
        db.collection(table)
          .find(filter)
          .toArray()
          .then((data) => {
            if(data){
              return resolve(data);
            }
            else{
              return reject(err);
            }
          })
          .catch((err) => {
            return reject(err);
          });
      })
      .catch((err) => {
        return reject({ status: 500, msg: "Error connecting db" });
      });
  });
};

const deleteRecord = (table, filter) => {
  return new Promise((resolve, reject) => {
    dbConnection()
      .then((db) => {
        db.collection(table).deleteMany(filter).then((data)=>{
          return resolve(data)
        }).catch((err)=>{
          return reject(err);
        })
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = { dbConnection, addRecord, updateRecord, getRecord, deleteRecord };
