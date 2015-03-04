
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var child = require('child_process');

var request = require('request');
var cheerio = require('cheerio');

var postTitle;
var postBody;

var app = express();

// all environments
app.set('port', process.env.PORT || 1338);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("X-Frame-Options", "deny");
  res.setHeader("L33t-Headers", "omg")
  return next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.render('index');
});

app.get('/resume', function(req, res){
	res.render('resume');
});

app.get('/testredirect', function(req, res){
  res.render('redirect')
})

app.get('/new', function(req, res){
  res.render('new');
})

app.get('/phonegap', function(req, res){
  res.render('phonegap');
})

app.get('/domx', function(req, res){
  res.render('domx');
})

// Dom Xss without link
app.get('/domxv2', function(req, res){
  res.render('domxv2');
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
