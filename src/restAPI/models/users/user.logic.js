const moment = require('moment');


class UserLogic{
    constructor(){

    }



    ifAllowedToPost(currentPostDate, nextPostDate){
        if(!currentPostDate){
            return true;
        }
        if(!nextPostDate){
            nextPostDate = new moment(currentPostDate).add(1, 'm');
        }
        //var nextPostDate = new moment(currentPostDate).add(24, 'h');
        var currentDate = new moment();

        return nextPostDate < currentDate;
    }
}

module.exports = new UserLogic();
