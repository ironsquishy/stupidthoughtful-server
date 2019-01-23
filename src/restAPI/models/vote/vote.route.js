const Router = require('express').Router();
const StpdResponses = require('../stupidresponses/stupidResponse.services');


/*Put*/
Router.put('/vote', addVoteToResponse);

module.exports = Router;

function addVoteToResponse(req, res, next){
    res.json({ message : 'Still testing but just router level response.' });
}

