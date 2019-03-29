var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var indexRouter = require('./routes/index');
var constructionRouter = require('./routes/construction');

//connect to database
var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: false
}));



//ROUTES OF ALL THE PAGES
//TODO: fix references to actual page instead of constructionRouter
 app.use('/', indexRouter);
//app.use('/', constructionRouter);
app.use('/issues', constructionRouter);
app.use('/about-us', constructionRouter);
app.use('/get-involved', constructionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.render('construction', {
    title: 'Construction Going On'
  })
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//newsletter microservice
app.post('/post-newsletter', function (req, res) {
  dbConn.then(function (db) {
    delete req.body._id; // for safety reasons
    db.collection('newsletter').insertOne(req.body);
    console.log("Inserted")
    console.log(req.body)
  });
  res.send('Data received:\n' + JSON.stringify(req.body));
});



module.exports = app;
