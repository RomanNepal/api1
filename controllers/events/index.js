const events = require('events');
const express = require('express');
const app = express();
let myEvents = new events.EventEmitter();

app.use((req, res, next)=>{
    req.myEvents = myEvents;
    next();
});

myEvents.on('hello',()=>{
    console.log("Hello there");
})

module.exports = app;