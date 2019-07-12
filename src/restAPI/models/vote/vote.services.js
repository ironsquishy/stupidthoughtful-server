require('../../helpers/db');
//const StpdVoteModel = require('./vote.model');

const StpdResponseModel = require('../stupidresponses/stupidResponses.model');
const StpdPostModel = require('../stupidpost/stupidPost.model');
const StpdVote = require('./vote.model');
const StpdPostLogic = require('../stupidpost/stupidPost.logic');


module.exports = {
	getVotesByResId,
	userAllowedToVote,
	createVote
};

async function getVotesByResId(_respId) {

	let currentRes = await StpdResponseModel.findById(_respId);
	return currentRes.votes;
}

async function userAllowedToVote({postId, userId}){
	try {
		let currentPost = await StpdPostModel.findById(postId);

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

		let currentPost = await StpdPostModel.findById(postId).populate('StpdVote');
		
		
		if(StpdPostLogic.ifUserAllowedVote(currentPost.votes, voterId)) {
			let newVote = new StpdVote({ responseId, postId, voterId });

			currentPost.voters.push(newVote);
			currentPost.userVoted = true;
			newVote.save();
		} else {
			currentPost.userVoted = false;
		}

		return await currentPost.save();
	} catch (error) {
		throw error;
	}

}