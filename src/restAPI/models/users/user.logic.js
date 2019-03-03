const moment = require('moment');


class UserLogic{
    constructor(){
    }

    addNextPostDate(){
        return new moment().add(1, 'h').toDate();
    }

    ifAllowedToPost(currentPostDate, nextPostDate){
        if(!currentPostDate){
            return true;
        }
        if(!nextPostDate){
            nextPostDate = this.addNextPostDate();
        }

        var currentDate = new moment().toDate();

        return nextPostDate.getTime() < currentDate.getTime();
    }
}

module.exports = new UserLogic();
