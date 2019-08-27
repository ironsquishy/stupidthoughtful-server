const Configs = require('../../../../config.json');
const moment = require('moment');

const TimeLimitMins = (process.env.NODE_ENV == 'production') ? Configs.ENV.Prod.PostTimeLimitMins : Configs.ENV.Dev.PostTimeLimitMins;

class UserLogic{
	constructor(){
	
	}

	addNextPostDate(){
		return new moment().add(TimeLimitMins, 'm').toDate();
	}

	ifAllowedToPost(currentPostDate, nextPostDate){
		if(!currentPostDate){
			return true;
		}
		if(!nextPostDate){
			nextPostDate = this.addNextPostDate();
		}

		let currentDate = new moment().toDate();

		return nextPostDate.getTime() < currentDate.getTime();
	}
}

module.exports = new UserLogic();
