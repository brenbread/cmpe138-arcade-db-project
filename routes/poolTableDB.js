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
//returns all rows of poolTables
  con.query('SELECT * FROM pool_table',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });
});

//add route
router.post('/add', function(req, res, next) {
  var data = req.body;
console.log(data);
  con.query('INSERT INTO pool_table SET ?', data, function(error, results) {
    if(error) throw error;

    console.log("Pool Table " + req.body.p_table_id + " added");
  })
  res.end("success");
  console.log("Added: " + data);
});

//delete route
router.delete('/', function(req, res, next) {
    con.query('DELETE FROM pool_table WHERE p_table_id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        else res.send("success");
        console.log("Pool table deleted");
    });
});

module.exports = router;
