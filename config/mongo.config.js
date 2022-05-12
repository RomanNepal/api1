const Mongoose = require('mongoose');
dbUrl = "mongodb://localhost:27017/mern";
Mongoose.connect(dbUrl,{autoIndex:true,autoCreate:true},(err)=>{
    if(err){
        console.log('Error connecting database');
    }
    else{
        console.log("Database connected successfully");
    }
})
module.exports = Mongoose; 