var moment = require("moment");

class StpdPostLogic{
    constructor(){

    }

    ifAllowedToPost(currentPostDate){
        // if(typeof currentPostDate ===  'string'){
        //     currentPostDate = new Date(currentPostDate);
        // }
        var nextPostDate = new moment(currentPostDate).add(24, 'h');

        return currentPostDate < nextPostDate;
    }
}

module.exports = StpdPostLogic;