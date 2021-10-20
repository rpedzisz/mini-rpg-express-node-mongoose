const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/';
const dbName = 'graDB';
var connection = mongoose.connect(url+dbName, {
useNewUrlParser:true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true
})

var db = mongoose.connection
db.on('error', console.error);
db.once('open', function () {

    console.log("db connect");

    

   

    

    

    
 

});
