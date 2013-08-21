
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var refreshBlog = function(){

		request('http://hoverboard.io/tehskylark/blog', function(error, response, body){
			console.log('hey')
		   $ = cheerio.load(body);
		  postTitle = $('.post_snippet > h2').eq(0).text()
		  postBody = $('.post_snippet > p').eq(1).text()

		  console.log(postTitle)
		   			
		})
	
}
refreshBlog();


setInterval(function(){
	refreshBlog();
}, 3600000)

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.render('index', {title: postTitle});
	console.log(postTitle);
});
app.get('/users', user.list);

app.post('/blog', function(req, res){
  // post_snippet published
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
