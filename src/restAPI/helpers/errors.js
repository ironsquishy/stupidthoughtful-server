//Middleware handler...

const moment = require('moment');

module.exports = function errorHandler(err, req, res, next){
	if(typeof (err) === 'string'){
		//Custom error
		console.log(`Error at ${moment().format('MMMM Do YYYY, h:mm:ss')} : ${err}`);
		return res.status(400).json({message : err});
	}

	if(err.name === 'ValidationError'){
		//Mongoose
		console.log(`Error at ${moment().format('MMMM Do YYYY, h:mm:ss')} : ${err.message}`);
		return res.status(400).json({message : err.message}); 
	}

	if(err.name == 'UnauthorizedError'){
		console.log(`Error at ${moment().format('MMMM Do YYYY, h:mm:ss')} : Invalid token`);
		return res.status(401).json({message : 'Invalid token'});
	}

	//Default
	console.log(`Error at ${moment().format('MMMM Do YYYY, h:mm:ss')} : ${err}`);
	return res.status(500).json({message : err.message });
};