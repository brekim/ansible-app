var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Express RESTful API');
  });
  
  module.exports = router;