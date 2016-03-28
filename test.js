
var http = require('http');
dispatcher = require('./myDispatcher');

const PORT = 8080;

function handleRequest(request, response) {
	try {
		dispatcher.dispatch(request, response);
	}
	catch(err) {
		console.log(err);
	}
	response.end('successful get: ' + request.url);
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
	console.log("listener callback invoked");
});