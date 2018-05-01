var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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

router.get('/', function(req, res, next) {
//returns all rows of food
  con.query('SELECT * FROM food',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });

});

module.exports = router;
