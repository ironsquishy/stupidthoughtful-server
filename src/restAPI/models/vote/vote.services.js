const StpdResponse = require('../stupidresponses/stupidResponses.model');


module.exports = {
    getVotesByResId,
    createVote
};

async function getVotesByResId(_respId){
    
    var currentRes = await StpdResponse.findById(_respId);
    return currentRes.votes;
}

async function createVote(_respId){
    var currentRes = await StpdResponse.findById(_respId);

    currentRes.votes++;
    /*TODO also see if it max voted for post */
    return await currentRes.save();
}