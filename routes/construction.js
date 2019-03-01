var express = require('express');
var router = express.Router();

/*  Temporary route to construction */
router.get('/', function(req, res, next) {
  res.render('construction', {title: 'Construction Going On'})
});



module.exports = router;
