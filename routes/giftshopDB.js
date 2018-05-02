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
//returns all rows of gift_shop
  con.query('SELECT * FROM gift_shop',  function(err, rows) {
    res.json(rows);
    if (err) throw err;
  });
});

router.delete('/', function(req, res, next) {
    con.query('DELETE FROM gift_shop WHERE item_id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        else res.send("success");
        console.log("Gift shop item deleted");
    });
});

module.exports = router;
