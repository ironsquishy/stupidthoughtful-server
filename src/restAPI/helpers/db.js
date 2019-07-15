const CONFIG = require('../../../config');
const mongoose = require('mongoose');



mongoose.connect(CONFIG.Database.connectionStr, { useNewUrlParser: true })
	.then(() => {
		console.log('Successfully connected');
	})
	.catch((err) => {
		console.log('Error:', err);
	});
mongoose.Promise = global.Promise;

module.export = {
	User : require('../models/users/user.model')
};