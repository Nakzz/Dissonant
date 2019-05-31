var express = require('express');
var router = express.Router();

var issuesObject = require('../issuesContext.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , issuesObject: issuesObject });
});

module.exports = router;
