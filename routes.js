module.exports = function(app) {
	app.get('/', function(request, response) {
		response.send('Hello World!');
	});

	app.get('/url/:url', function(request, response) {
		console.log(request.params);
		response.send(JSON.stringify({
			url: request.params.url
		}));
	});

};