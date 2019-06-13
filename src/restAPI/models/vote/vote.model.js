const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteModel = {
	responseId : { type : Schema.Types.ObjectId, required : true, ref : 'StpdResponse' },
	postId : { type : Schema.Types.ObjectId, required : true, ref : 'StupidPost' },
	voterId : { type : Schema.Types.ObjectId, ref : 'User'},
	voter : { type : String, required : false },
	createDate : { type : Date, required : true, default : Date.now },
};

const VoterSchema = new Schema(VoteModel).set('toJSON', { virtual : true });

module.exports = mongoose.model('StpdVote', VoterSchema);