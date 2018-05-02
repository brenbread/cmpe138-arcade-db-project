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
//returns all rows of customers
  con.query('SELECT * FROM customer',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });
});

router.delete('/', function(req, res, next) {
    con.query('DELETE FROM customer WHERE cust_id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        else res.send("success");
        console.log("Customer deleted");
    });
});

module.exports = router;
