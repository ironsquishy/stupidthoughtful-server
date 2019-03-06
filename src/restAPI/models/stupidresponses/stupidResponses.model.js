const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var StpdResponseModel = {
    ownerId : {type : mongoose.Schema.Types.ObjectId, required  : true,  ref : 'User'},
    owner : { type : String, required : true},
    postId : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'StupidPost'},
    message : { type: String, required : true},
    votes : { type : Number, default : 0},
    voters : [{ type : mongoose.Schema.Types.ObjectId, ref : 'User'}]
}

const stpdResponseSchema = new Schema(StpdResponseModel).set('toJSON', { virtual : true });

module.exports = mongoose.model('StpdResponse', stpdResponseSchema);
