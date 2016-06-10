require('babel-core/register');
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const sassMiddleware = require('node-sass-middleware');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const handleRender = require('./middleware/handleRender');

const app = express();

// Initialize App
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: 'public/scss',
  dest: 'public/static/css',
  prefix: '/static/css',
}));
app.use(express.static(path.join(__dirname, 'public')));

// Setup dev webpack
if (app.get('env') === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

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
const user = require('./routes/user');
const userSession = require('./routes/session')(passport);

// Setup server API routes
app.use('/user', user);
app.use('/session', userSession);

// Setup client route rendering
app.use(handleRender);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});


module.exports = app;
