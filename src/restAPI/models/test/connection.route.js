const Router = require('express').Router();

Router.get('/connection', testConenction);


module.exports = Router;

function testConenction(req, res,){
	res.status(200);
	res.send(JSON.stringify({
		'message' : 'Server connected and running',
		'success' : 1
	}));
}