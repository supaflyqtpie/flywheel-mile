const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const sassMiddleware = require('node-sass-middleware');

const app = express();

// Initialize App
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: 'public/scss',
  dest: 'public',
  root: __dirname,
  prefix: '/css',
}));
app.use(express.static(path.join(__dirname, 'public')));

// Setup sessions
// TODO: setup secret key
app.use(session({
  secret: 'lalala',
  name: 'user_session',
  proxy: true,
  resave: true,
  saveUninitialized: true,
}));

// Setup Passport
app.use(passport.initialize());
app.use(passport.session());

const initPassport = require('./passport_strategies/initLocalAuth');
initPassport(passport);

// Initialize Routes
const routes = require('./routes/index');
const user = require('./routes/user');
const userSession = require('./routes/session');

// Setup Routes
app.use('/', routes);
app.use('/user', user);
app.use('/session', userSession);

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

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
    res.render('layout/errorContainer', {
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
  res.render('layout/errorContainer', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
