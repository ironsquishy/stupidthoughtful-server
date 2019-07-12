const moment = require('moment');


class UserLogic{
	constructor(){
	}

	addNextPostDate(){
		return new moment().add(5, 'm').toDate();
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
