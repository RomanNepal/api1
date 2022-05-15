const mongoose = require('mongoose');
const BannerSchemaDef = new mongoose.Schema({
title: {
    type: String
},
image:{
    type: String,
    required: true
},
link:{
    type: String
},
status:{
    type: String,
    enum: ["active", "inactive"],
    default: ["inactive"]
},

},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const BannerModel = mongoose.model('Banner',BannerSchemaDef);

module.exports = BannerModel;