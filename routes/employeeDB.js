var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express();

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
//returns all rows of employees
  con.query('SELECT * FROM employee',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });
});

// DELETE FROM employee WHERE emp_id = <id passed from function>
router.delete('/', function(req, res, next) {
    con.query('DELETE FROM employee WHERE emp_id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        else res.send("success");
        console.log("Employee deleted");
    });
});



module.exports = router;
