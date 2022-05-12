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
        content: "Home content",
    msg: "Home content message",
    })
});
app.get('/aboutus', (req, res)=>{
    res.json({
        content: "Home content",
    msg: "Home content message",
    })
});
module.exports = app;