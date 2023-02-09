const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
name:String,
brand:String,
category:String,
addedBy:String,
price:Number,

})

module.exports = mongoose.model("product", productSchema);