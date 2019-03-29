var express = require('express');
var router = express.Router();

// var mongoose = require("mongoose");

// //connecting mongodb
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/newsletter");

// //newsletter scheme
// var newsletterSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   createdDate: Date
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;
