require('../../helpers/db');
//const StpdVoteModel = require('./vote.model');

const StpdResponseModel = require('../stupidresponses/stupidResponses.model');
const StpdPostModel = require('../stupidpost/stupidPost.model');
const StpdVote = require('./vote.model');
const StpdPostLogic = require('../stupidpost/stupidPost.logic');
const StpdPostService = require('../stupidpost/stupidPost.services');


module.exports = {
	getVotesByResId,
	userAllowedToVote,
	createVote,
	getUserVotedResponse
};

async function getVotesByResId(_respId) {

	let currentRes = await StpdResponseModel.findById(_respId);
	return currentRes.votes;
}

async function getUserVotedResponse({responseId, postId, voterId}){
	
	
}

async function userAllowedToVote({postId, userId}){
	try {
		let currentPost = await StpdPostModel.findById(postId).populate('voters');

		return StpdPostLogic.ifUserAllowedVote(currentPost.votes, userId);
	} catch (error){
		throw error;
	}
}

async function createVote({
	responseId,
	postId,
	voterId
}) {
	try {
		let currentPost = await StpdPostService.getPostWithVotes(postId);
	
		if(StpdPostLogic.ifUserAllowedVote(currentPost.voters, voterId)) {
			let newVote = new StpdVote({ responseId, postId, voterId });
			let currentResponse = await StpdResponseModel.findById(responseId);

			currentPost.voters.push(newVote);
			currentResponse.votes++;
			newVote.save();
			currentResponse.save();
		}
		
		return await currentPost.save();

	} catch (error) {
		throw error;
		
	}	

}

