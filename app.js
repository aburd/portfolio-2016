var path = require('path');
var fs = require('fs');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Handlebars helpers
hbs.registerHelper('breakup', function(options){
  var pArr = options.fn(this).split(/\/n\/n/g)
  return new hbs.SafeString( pArr.map( function(p) { 
      return "<p>"+p+"</p>" 
    })
    .join("") 
  )
})

hbs.registerHelper('formatDate', function(options) {
  return new Date(options.fn(this)).toDateString()
})

hbs.registerHelper('alternateSides', function(indexCount) {
  if(indexCount % 2 === 0)
    return 'r'
  else
    return 'l'
})

// Code for Handlebar partials
var partialsFolder = path.join(__dirname, 'views', 'partials')
hbs.registerPartials(partialsFolder)
hbs.registerPartial('navigation', fs.readFileSync(partialsFolder + '/navigation.hbs'))
hbs.registerPartial('footer', fs.readFileSync(partialsFolder + '/footer.hbs'))


module.exports = app;
