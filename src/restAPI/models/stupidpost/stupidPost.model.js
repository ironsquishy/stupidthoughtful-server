const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Scheme = mongoose.Schema;

let stupidPostModel = {
	ownerId : {type : mongoose.Schema.Types.ObjectId, required  : true,  ref : 'User'},
	owner : { type : String, required : false},
	createDate: { type : Date, required: true, default : Date.now },
	message : { type: String, required : true},
	stpdHash : { type: String, required : true, default : defaultStpdHash},
	stpdResponses : [{ type : mongoose.Schema.Types.ObjectId, ref : 'StpdResponse'}],
	canVote : { type : Boolean, required : false, default : true },
	userVoted : { type : Boolean, require : false, default : false },
	voters : [{ type: Scheme.Types.ObjectId, ref : 'StpdVote'}]
};

function defaultStpdHash(){
	
	return bcrypt.hashSync(this.createDate.toISOString(), 10);
}

function userCanVote(){
	
}

const stupidPostScheme = new Scheme(stupidPostModel).set('toJson', { virtual : true });

stupidPostScheme.post('init', userCanVote);

module.exports = mongoose.model('StupidPost', stupidPostScheme);