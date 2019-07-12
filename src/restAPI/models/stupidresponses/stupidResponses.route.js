const Router = require('express').Router();
const Passport = require('passport');

const StpdResponse = require('./stupidResponse.services');

//Get
Router.get('/:postId', Passport.authenticate('jwt', { session : false }), getResponseByPostId);

//Post
Router.post('/create', Passport.authenticate('jwt', { session : false }), createResponse);

//Put
Router.put('/update/:responseId', Passport.authenticate('jwt', { session : false }), updateResponse);
Router.put('/vote/:responseId', Passport.authenticate('jwt', { session : false }), voteOnResponse);

module.exports = Router;


function getResponseByPostId(req, res, next){
	StpdResponse.getResponsesByPost(req.params.postId, req.params.ownerId)
		.then( responses => responses ? res.json(responses) : res.json([]))
		.catch(err => next(err));
}

function createResponse(req, res, next){
	let newResponse = {
		owner : req.body.owner,
		ownerId : req.body.ownerId,
		postId : req.body.postId,
		message : req.body.message
	};

	StpdResponse.createResponse(newResponse)
		.then(stpdPost => stpdPost ? res.json(stpdPost) : res.json({}))
		.catch(err => next(err));
}

function voteOnResponse(req, res, next){
	var newVote = {
		owner : req.user.username,
		ownerId : req.user._id,
		responseId : req.params.responseId
	};

	res.status(200);
	res.json(newVote);
}

function updateResponse(req, res, next){
	console.log('Update response:', req.params);
}