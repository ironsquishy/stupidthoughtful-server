const Router = require('express').Router();
const Passport = require('passport');

const StpdResponse = require('./stupidResponse.services');

Router.post('/create', Passport.authenticate('jwt', { session : false }), createRespose);

Router.put('/update/:responseId', Passport.authenticate('jwt', { session : false }), updateResponse);

Router.put('/vote/:responseId', Passport.authenticate('jwt', { session : false }), voteOnResponse);

module.exports = Router;

function createRespose(req, res, next){
    let newResponse = {
        owner : req.user.username,
        ownerId : req.user._id,
        postId : req.body.postId,
        message : req.body.message
    };

    StpdResponse.createResponse(newResponse)
    .then(stpdPost => stpdPost ? res.json(stpdPost) : res.json({}))
    .catch(err => next(err));
};

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