const mongoose = require('mongoose');
const {titleSchema, statusSchema, indexSchema} = require('./title.schema') 
const LabelSchema = mongoose.Schema({
    ...titleSchema,
    link: {
        type: String,
    },
    image:{
        type: String,
        
    },
    ...statusSchema,
    type:{
        type: String,
        enum:["brand", "banner"]
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, indexSchema);

const LabelModel = mongoose.model('label', LabelSchema);
module.exports = LabelModel;



