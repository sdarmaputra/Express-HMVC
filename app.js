var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var fs = require('fs');
require('./configs/config');
require('handlebars-form-helpers').register(hbs.handlebars);

var app = express();

var module_dirname = path.join(__dirname, 'app_modules');
fs.readdirSync(module_dirname).forEach(function (module) {
  if (fs.lstatSync(path.join(module_dirname, module)).isDirectory()) {
    fs.readdirSync(path.join(module_dirname, module, 'controller')).forEach(function (file) {
      // Define module
      var route = require(path.join(module_dirname, module, 'controller', file));
      // Define route
      app.use('/' + module, route);
      console.log('loading module:'+ module + ' using controller:' + file);
    });
  }
});

// Default route for /
app.get('/', function(req, res) {
  res.redirect('/home');
});

// view engine setup
app.set('views', config.app_modules_dirname);
app.set('view engine', 'hbs');
hbs.registerPartials(config.base_partial_views_dirname);
hbs.registerPartials(config.app_modules_dirname);
app.engine('hbs', hbs.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render(config.base_views_dirname+'/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render(config.base_views_dirname+'/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
