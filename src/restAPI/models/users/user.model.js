const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserLogic = require('./user.logic');

const { StpdPostScheme } = require('../stupidpost/stupidPost.model');

var UserModal = {
    username : {type : String, unique : true, required : true},
    hash : {type : String, required : true},
    createdDate : { type : Date, default : Date.now },
    allowedPost : { type : Boolean, default : true },
    ownedPosts : [{ type: mongoose.Schema.Types.ObjectId, ref: 'StupidPost'}],
    lastPostDate : { type : Date },
    nextPostDate : { type : Date }
}

const UserSchema = new Schema(UserModal).set('toJSON', { virtual : true });

UserSchema.post('init', postFindUserTask);

module.exports = mongoose.model('User', UserSchema);

function postFindUserTask(){

    var canPost = UserLogic.ifAllowedToPost(this.lastPostDate, this.nextPostDate);
    
    if(canPost != this.allowedPost){
        this.allowedPost = canPost;
    }
}