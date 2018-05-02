var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

//database routes
var employeeDB = require('./routes/employeeDB.js');
var gamesDB = require('./routes/gamesDB.js');
var customerDB = require('./routes/customerDB.js');
var beverageDB = require('./routes/beverageDB.js');
var foodDB = require('./routes/foodDB.js');
var poolTableDB = require('./routes/poolTableDB.js');
var giftshopDB = require('./routes/giftshopDB.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employeedb', employeeDB);
app.use('/gamesdb', gamesDB);
app.use('/customerdb', customerDB);
app.use('/beveragedb', beverageDB);
app.use('/fooddb', foodDB);
app.use('/pooltabledb', poolTableDB);
app.use('/giftshopdb', giftshopDB);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
