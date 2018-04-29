var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
    id: 1,
    username: "brenbread",
    ssn: 12345678
  }, {
    id: 2,
    username: "wawawa",
    ssn: 98765432
  }
]);
});

module.exports = router;
