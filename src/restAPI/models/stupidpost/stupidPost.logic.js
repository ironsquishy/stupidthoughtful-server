const Configs = require('../../../../config.json');
const moment = require('moment');

const TimeLimitMins = (process.env.NODE_ENV == 'production') ? Configs.ENV.Prod.PostTimeLimitMins : Configs.ENV.Dev.PostTimeLimitMins;

class StpdPostLogic{
	constructor(){

	}

	ifAllowedToPost(currentPostDate){
		let nextPostDate = new moment(currentPostDate).add(TimeLimitMins, 'm');

		return currentPostDate < nextPostDate;
	}
    
	ifUserAllowedVote(postVotes, userId){
		return !postVotes.find(vote => vote.voterId == userId);
	}
}

module.exports = new StpdPostLogic();