const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

var stupidPostModel = {
    owner : { type : String, unique : true, required : true},
    createDate: { typ : Date, default : Date.now },
    message : { type: String, required : true},
    responses : []
}

const stupidPostScheme = new Scheme(stupidPostModel).set('toJson', { virtual : true });

module.exports = mongoose.model('StupidPost', stupidPostScheme);