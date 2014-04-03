
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
var pushover = require('./push');


//pushover.message('Hey', 'new title');

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
  res.setHeader("such-L33t-Header", "omg")
  return next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
 // res.setHeader("X-WebKit-CSP", "default-src 'self'");
	res.render('index');
});

app.get('/resume', function(req, res){
	res.render('resume');
});

app.get('/pushit', function(req, res) {
	console.log("Pushing and Pulling!")
	var gitIt = child.spawn('git', ['pull']);
    process.stdin.pipe(gitIt.stdin);

    gitIt.stdin.on("end", function() {
        console.log("Done!")
        res.send("Push/Pull Complete! (Do not refresh this page)")
    });

    gitIt.stdout.on('data', function(data) {
        console.log(data + '');
    });

    gitIt.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
