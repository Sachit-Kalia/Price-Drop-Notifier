const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    
     title: {
        type: String,
     },
     price: {
         type: String
     },
     link: {
         type: String
     },
     image: {
         type: String
     },
     addedBy: {
        type: String,
     }
    

});

module.exports = mongoose.model("product", ProductSchema);