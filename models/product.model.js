const mongoose = require('mongoose');
const titleSchema = require('./title.schema')
const ProductSchemaDef = mongoose.Schema({
title:{
    type: String
},
category:{
    type: mongoose.Types.ObjectId,
    ref: "Category"
},
slug:{
    type: string,
    unique: true
},
price:{
    type: Number,
    min: 1
},
discount:{
    type: Number,
    min: 0,
    max: 100
},
brand:{
    type: String,

},
after_discount:{
    type: Number
},
is_featured:{
    type: Boolean,
    default: false
},
status:{
    type: String,
    enum:['active', 'inactive'],
    default: "inactive"
}
},
{

})

const ProductModel = mongoose.model('Product',ProductSchemaDef);

