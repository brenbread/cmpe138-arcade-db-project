var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.get('/', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "arcade"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});
  //return all rows of arcade games
  con.query('SELECT * FROM arcade_machine',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });

});

module.exports = router;
