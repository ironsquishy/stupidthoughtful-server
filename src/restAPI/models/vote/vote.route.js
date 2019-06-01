const Router = require('express').Router();
const StpdResponses = require('../stupidresponses/stupidResponse.services');
const StpdVote = require('./vote.services');


/*Put*/
Router.put('/vote', addVoteToResponse);

/*Post*/
Router.post('/vote', createVote);

module.exports = Router;

function addVoteToResponse(req, res, next){
    res.json({ message : 'Still testing but just router level response.' });
}

function createVote(req, res, next){


}

