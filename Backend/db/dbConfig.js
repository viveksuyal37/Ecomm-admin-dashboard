const mongoose = require('mongoose');

dbConnect=()=>{
    mongoose.connect(process.env.DbConnectionString,(err)=>{
        if (err) return console.log(err); 
        console.warn("connected to database");
    });
}

dbConnect();

module.exports = dbConnect;
