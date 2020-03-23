var express = require('express');
var router = express.Router();

const migration = require("../migration/migration");

/* GET home page. */
router.get('/', function(req, res, next) {

  migration.up(res.send('Database Initialized'));
  
});

module.exports = router;
