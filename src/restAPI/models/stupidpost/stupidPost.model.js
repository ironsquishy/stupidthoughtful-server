const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Scheme = mongoose.Schema;

var stupidPostModel = {
    ownerId : {type : mongoose.Schema.Types.ObjectId, required  : false,  ref : 'User'},
    owner : { type : String, required : false},
    createDate: { type : Date, required: true, default : Date.now },
    message : { type: String, required : true},
    stpdHash : { type: String, required : true, default : defaultStpdHash},
    stpdResponses : [{ type : mongoose.Schema.Types.ObjectId, ref : 'StpdResponse'}]
}
function defaultStpdHash(){
    
    return bcrypt.hashSync(this.createDate.toISOString(), 10);
}

const stupidPostScheme = new Scheme(stupidPostModel).set('toJson', { virtual : true });

module.exports = mongoose.model('StupidPost', stupidPostScheme);