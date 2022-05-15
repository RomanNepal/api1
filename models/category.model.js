const mongoose = require('mongoose');

const CategorySchemaDef = new mongoose.Schema({
    title: {
        type: String,
        unique: true
        
     },
     link:{
         type:String
     },
     slug:{
         type:String,
         unique: true
     },
     summary:{
        type: String,
     },
     parent_id:{
         type:mongoose.Types.ObjectId,
         ref: "Category",
         default: null
     },
     image:{
         type: String
     },
     summary:{
         type: String,
     },
     brand:[{
        type: mongoose.Types.ObjectId,
        ref:"Brand"
     }],
     status:{
         type: String,
         enum: ['active', 'inactive'],
         default: "inactive"
     }
    
     

},
{
timestamps:true,
autoCreate: true,
autoIndex: true
})


const CategoryModel = new mongoose.model('Category', CategorySchemaDef);
module.exports = CategoryModel;