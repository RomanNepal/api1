const express = require('express');
const app  = express();

app.get('/', (req, res)=>{
    res.json({
        content: "Home content",
    msg: "Home content message",
    })
});
app.get('/contactus', (req, res)=>{
    res.json({
        content: "Contact Page",
    msg: "You contacted us",
    })
});
app.get('/aboutus', (req, res)=>{
    res.json({
        content: "About Us content",
    msg: "You wanted to know about us",
    })
});
module.exports = app;