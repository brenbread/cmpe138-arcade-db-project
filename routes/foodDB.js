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

//returns all rows of food
  con.query('SELECT * FROM food',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });

});

module.exports = router;
