const CONFIG = require('../../../config');
const mongoose = require('mongoose');



mongoose.connect(CONFIG.Database.connectionStr, { useNewUrlParser: true })
	.then((res) => {
		console.log('Mongoose Successfully connected to Database...');
	})
	.catch((err) => {
		console.log('Mongoose Connection Error:', err);
	});

mongoose.Promise = global.Promise;

module.export = {
	User : require('../models/users/user.model')
};