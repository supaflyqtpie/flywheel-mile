const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const handleRender = require('./middleware/handleRender');

const app = express();

// Initialize App
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap-material-design/dist/js')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap-material-design/dist/css')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/font-awesome/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/font-awesome/fonts')));

// Setup dev webpack
if (app.get('env') === 'development') {
  const webpackConfig = require('./webpack.config'); // eslint-disable-line global-require
  const webpack = require('webpack'); // eslint-disable-line global-require
  const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require
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
const userPackages = require('./routes/packages');

// Setup client route rendering
app.use(handleRender);

// Setup server API routes
app.use('/api', user);
app.use('/api', userSession);
app.use('/api', userPackages);

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
