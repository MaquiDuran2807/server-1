const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'drivers'

});
db.connect(function(err){
    if (err)throw err;
    console.log('database connect');
});

module.exports=db;