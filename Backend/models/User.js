const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
name:String,
email:String,
password:String,
joined:{
    type:Date,
    default:Date.now
}
})

module.exports = mongoose.model("users", userSchema);