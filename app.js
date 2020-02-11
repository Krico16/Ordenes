var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./database');
var session = require('express-session');
var SessionStorage = require('connect-mongo')(session);
var mongoose = require('mongoose');
require('dotenv').config();

database();

mongoose.connect(process.env.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;
const mdb = mongoose.connection;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var dashRouter = require('./routes/panel');
var orderRouter = require('./routes/orders')
var ProjectsRouter = require('./routes/project');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/p', express.static(__dirname + '/public/dash'));
app.use('/inputmask', express.static(__dirname + '/node_modules/inputmask'));
app.use('/script', express.static( __dirname + '/public/javascripts' ))

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.PHRASE ,
  cookie: {
    maxAge: 60 * 60 * 1000,
    secure: true
  },
  resave: false,
  saveUninitialized: true,
  store: new SessionStorage({ mongooseConnection: mdb }),
}));

/*
app.use(session({
  secret: 'KRICO',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection : database
  })
}))
*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/dashboard', dashRouter);
app.use('/ordenes', orderRouter);
app.use('/projects', ProjectsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if(!req.session){
    res.redirect('/');
  }
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;