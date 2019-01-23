var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
require('./api/model/Movies')
require('./api/model/User')
var indexRouter = require('./routes/index');
var usersRouter = require('./api/route/user');
var movieRouter = require('./api/route/movie')
var userRouter = require('./api/route/userRoute')
var movieRoutes = require('./api/route/movieRoute')

var app = express();

//Connect MongoDB

var mongoDB = 'mongodb://tranquang:123456a@ds243254.mlab.com:43254/cinema';
mongoose.connect(mongoDB,{useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connect fail !'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secure: true,
  httpOnly: true,
  secret: 'vvv',
  resave: false,
  saveUninitialized: true
 }))
require('./api/passport').createPassportConfig(app)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/movie',movieRouter)
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/movie', movieRoutes)
// catch 404 and forard to error handler
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
