
const DB = require('../../helpers/db');
const StpdVoteModel = require('./vote.model');
const StpdResponseModel = require('../stupidresponses/stupidResponses.model');
const StpdPostModel = require('../stupidpost/stupidPost.model');


module.exports = {
    getVotesByResId,
    createVote
};

async function getVotesByResId(_respId){
    
    var currentRes = await StpdResponse.findById(_respId);
    return currentRes.votes;
}

async function createVote({responseId, postId, voterId }){
    var currentRes = await StpdResponse.findById(responseId);
    var currrentPost = await StpdPostModel.findById(postId);

    var newVote = new StpdVoteModel(responseId, postId, voterId)
    /*Has 24 hours elapsed?*/
    // currentPost.canVote = false;






    
    /*TODO also see if it max voted for post */
    
}