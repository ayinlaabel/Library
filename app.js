var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const config = require('config');

const mongoURL = config.get("mongoDB");
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('open', ()=> {
  console.log('connected to mongodb ... ... ....')
})




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');

var app = express();

//Setup Cors
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Connect-Flash Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
res.locals.messages = require('express-messages')(req, res);
next();
});

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) =>{
      var namespace = param.split('.'),
          root = namespace.shift(),
          formParam = root;
      
      while(namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }
      return{
          param : formParam,
          msg : msg,
          value : value
      };
  }
}));

//Passport Config
require('./config/passport')(passport);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

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
