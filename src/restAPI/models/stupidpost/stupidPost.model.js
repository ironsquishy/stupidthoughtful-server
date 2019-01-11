const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Scheme = mongoose.Schema;

var stupidPostModel = {
    owner : { type : String, unique : true, required : true},
    createDate: { typ : Date, default : Date.now },
    message : { type: String, required : true},
    stpdHash : { type: String, requireed : true, default : defaultStpdHash}
    // responses : []
}
function defaultStpdHash(){
    return bcrypt.hashSync(this.createDate, 'salty');
}

const stupidPostScheme = new Scheme(stupidPostModel).set('toJson', { virtual : true });

module.exports = mongoose.model('StupidPost', stupidPostScheme);