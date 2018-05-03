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

router.post('/edit', function(req, res, next) {
  var data = {
    game_name: req.body.game_name,
    game_cost: req.body.game_cost,
    play_count: req.body.play_count
  };
  con.query('UPDATE arcade_machine SET ? WHERE game_id = ' + req.body.game_id, data, function(error, results) {
    console.log("Arcade Machine " + req.body.game_id + " edited");
  })
  res.end("success");
});

//edit playcount
router.post('/editplaycount', function(req, res, next) {

  console.log("Game ID: " + req.body.game_id);
  console.log("Custommer ID: " + req.body.cust_id);

  /*
  UPDATE customer, arcade_machine
SET customer.balance = customer.balance - arcade_machine.game_cost,
customer.money_spent = customer.money_spent + arcade_machine.game_cost,
arcade_machine.play_count = arcade_machine.play_count + 1
WHERE customer.cust_id = 1 AND game_id = 1;
  */
  con.query('UPDATE customer, arcade_machine SET customer.balance = customer.balance - arcade_machine.game_cost, customer.money_spent = customer.money_spent + arcade_machine.game_cost, arcade_machine.play_count = arcade_machine.play_count + 1 WHERE customer.cust_id = '+req.body.cust_id+' AND arcade_machine.game_id = '+req.body.game_id, function(error, results) {
          console.log("Arcade Machine " + req.body.game_id + " playcount edited");
        })
        res.end("success");

});


router.delete('/', function(req, res, next) {
    con.query('DELETE FROM arcade_machine WHERE game_id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        else res.send("success");
        console.log("Arcade machine deleted");
    });
});

module.exports = router;
