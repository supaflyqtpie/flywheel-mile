var dispatcher = require('httpdispatcher');

dispatcher.setStatic('resources');
dispatcher.setStaticDirname('.');

exports.dispatch = function(req, res) {
	dispatcher.onGet('/home', function(req, res) {
		res.writeHead(200, {'Content-Type:': 'text/plain'});
		res.end('Home');
	});

	dispatcher.dispatch(req, res);
}



