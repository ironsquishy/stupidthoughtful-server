const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserModal = {
    username : {type : String, unique : true, required : true},
    hash : {type : String, required : true},
    createdDate : { type : Date, default : Date.now },
    allowedPost : { type : Boolean, default : true }
}

const UserSchema = new Schema(UserModal).set('toJSON', { virtual : true });

module.exports = mongoose.model('User', UserSchema);

