var moment = require('moment');

class StpdPostLogic{
	constructor(){

	}

	ifAllowedToPost(currentPostDate){
		let nextPostDate = new moment(currentPostDate).add(24, 'h');

		return currentPostDate < nextPostDate;
	}
    
	ifUserAllowedVote(postVotes, userId){
		console.log('Check allowed to vote');
		console.log(postVotes);
		return !postVotes.find(vote => vote.voterId == userId);
	}
}

module.exports = StpdPostLogic;