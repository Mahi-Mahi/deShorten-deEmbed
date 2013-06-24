var express = require('express');
var http = require('http');
var app = module.exports = express();
var RedisStore = require('connect-redis')(express);

var redis = require("redis").createClient();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	console.log('views', __dirname + '/views');
	app.set('view engine', 'jade'); //jade as template engine
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: "kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig",
		store: new RedisStore({
			host: 'localhost',
			port: 3000,
			client: redis
		})
	}));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});


app.get('/', function(request, response) {
	response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});