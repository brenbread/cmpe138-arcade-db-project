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

//edit route
router.post('/edit', function(req, res, next) {
  var data = {
    balance: req.body.balance,
    money_spent: req.body.money_spent
  };
  con.query('UPDATE customer SET ? WHERE cust_id = ' + req.body.cust_id, data, function(error, results) {
    console.log("Customer " + req.body.cust_id + " edited");
  })
  res.end("success");
});

router.post('/add', function(req, res, next) {
  var data = req.body;

  con.query('INSERT INTO customer SET ?', data, function(error, results) {
    console.log("Customer " + req.body.cust_id + " added");
  })
  res.end("success");
  console.log("Added: " + data);
});

//delete route
router.delete('/', function(req, res, next) {
    con.query('DELETE FROM customer WHERE cust_id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        else res.send("success");
        console.log("Customer deleted");
    });
});

module.exports = router;
