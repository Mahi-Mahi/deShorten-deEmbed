var express = require('express'),
	connect = require('connect'),
	http = require('http'),
	path = require('path');

var app = module.exports = express();
var RedisStore = require('connect-redis')(express);

if (process.env.REDISTOGO_URL) {
	// inside if statement
	var rtg = require("url").parse(process.env.REDISTOGO_URL);
	var redis = require("redis").createClient(rtg.port, rtg.hostname);

	redis.auth(rtg.auth.split(":")[1]);

} else {
	var redis = require("redis").createClient();
}

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger({
		immediate: true,
		format: 'dev'
	}));
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

require('./routes.js')(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

/*


redis.set('foo', 'bar');

redis.get('foo', function(err, value) {
  console.log('foo is: ' + value);
});



*/