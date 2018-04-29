var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//database route
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

  con.query('SELECT * FROM arcade_machine',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });

});

module.exports = router;
