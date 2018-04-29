var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//employee route
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

//returns all rows of arcade games
  con.query('SELECT * FROM employee',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });

});

module.exports = router;
