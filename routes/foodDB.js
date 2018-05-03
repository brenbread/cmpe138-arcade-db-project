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

//add route
router.post('/add', function(req, res, next) {
  var data = req.body;

  con.query('INSERT INTO food SET ?', data, function(error, results) {
    if(error) throw error;
    console.log(data);
    console.log("Game " + req.body.food_id + " added");
  })
  res.end("success");
  console.log("Added: " + data);
});

router.post('/edit', function(req, res, next) {
  var data = {
    food_id: req.body.food_id,
    food_name: req.body.food_name,
    food_cost: req.body.food_cost
  };
  con.query('UPDATE food SET ? WHERE food_id = ' + req.body.food_id, data, function(error, results) {
    console.log("Food " + req.body.food_id + " edited");
  })
  res.end("success");
});


router.delete('/', function(req, res, next) {
    con.query('DELETE FROM food WHERE food_id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        else res.send("success");
        console.log("Food deleted");
    });
});

module.exports = router;
