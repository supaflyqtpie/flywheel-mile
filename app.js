const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Passport setup and initialization
app.use(session({
    secret: "lalala",
    name: "lalala",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

const initPassport = require('./passport_strategies/initLocalAuth');
initPassport(passport);

const routes = require('./routes/index')(passport);
const users = require('./routes/users');
const registration = require('./routes/registration')(passport);
const logout = require('./routes/logout');

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/', routes);
app.use('/users', users);
app.use('/register', registration);
app.use('/session', session);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// (err, req, res, next)
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('layout/error_page', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
// (err, req, res, next)
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('layout/error_page', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
