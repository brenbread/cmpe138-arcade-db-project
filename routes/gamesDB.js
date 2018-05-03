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
  //return all rows of arcade games
  con.query('SELECT * FROM arcade_machine',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });
});

//add route
router.post('/add', function(req, res, next) {
  var data = req.body;

  con.query('INSERT INTO arcade_machine SET ?', data, function(error, results) {
    if(error) throw error;
    console.log(data);
    console.log("Game " + req.body.game_id + " added");
  })
  res.end("success");
  console.log("Added: " + data);
});

router.delete('/', function(req, res, next) {
    con.query('DELETE FROM arcade_machine WHERE game_id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        else res.send("success");
        console.log("Arcade machine deleted");
    });
});

module.exports = router;
