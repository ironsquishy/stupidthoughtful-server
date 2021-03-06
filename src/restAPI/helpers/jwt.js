const expressJWT = require('express-jwt');
const CONFIG = require('../../../config');
const PublicAccess = require('../publicAccess');

const UserService = require('../models/users/user.services');

module.exports = jwt;

function jwt (){
	let secret = CONFIG.Database.secret;

	return expressJWT({ secret, isRevoked})
		.unless({
			path : PublicAccess
		});
}

async function isRevoked(req, payload, done){
	let user = await UserService.getById(payload.sub);
    
	if(!user){
		return done(null, true);
	}

	done();
}