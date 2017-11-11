var express = require('express');
// var data = require('./request/data');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('students');
});

module.exports = router;
