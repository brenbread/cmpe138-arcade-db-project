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

//edit route
router.post('/edit', function(req, res, next) {
  var data = {
    emp_name: req.body.emp_name,
    emp_type: req.body.emp_type
  };
  con.query('UPDATE employee SET ? WHERE emp_id = ' + req.body.emp_id, data, function(error, results) {
    console.log("Employee " + req.body.emp_name + " edited");
  })
  res.end("success");
});

router.post('/add', function(req, res, next) {
  var data = req.body;

  con.query('INSERT INTO employee SET ?', data, function(error, results) {
    console.log("Employee " + req.body.emp_id + " added");
  })
  res.end("success");
  console.log("Added: " + data);
});

// DELETE 
router.delete('/', function(req, res, next) {
    con.query('DELETE FROM employee WHERE emp_id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        else res.send("success");
        console.log("Employee deleted");
    });
});



module.exports = router;
