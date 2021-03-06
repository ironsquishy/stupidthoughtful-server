require('../../helpers/db');
const StpdPost = require('./stupidPost.model');
const User = require('../users/user.model');
const UserLogic = require('../users/user.logic');

const EmptyPost = {
	owner : 'Not Available',
	createDate : '00000000',
	stpdHash : '000000',
	message : 'No Post available',
	error : 'No available post',
	stpdResponses : []
};

module.exports = {
	getById,
	createPost,
	updatePost,
	getAllbyUser,
	getAllbyCommunity,
	getCommunityLatest,
	getCommunityByHash,
	getPostWithVotes
    
};

async function getById (id){
	return await StpdPost.findById(id);
}

async function createPost (_params){
	let postUser = _params.user;
	let newPost = _params.post;


	let dbQuery = { 
		ownerId : postUser._id, 
		owner : postUser.username, 
		message : newPost.message
	};

	newPost = new StpdPost(dbQuery);

	postUser.ownedPosts.push(newPost);

	postUser.lastPostDate = Date.now();
	postUser.nextPostDate = UserLogic.addNextPostDate();
	postUser.allowedPost = false;

	await postUser.save();
	await newPost.save();

	let populateQuery = {
		path : 'ownedPosts',
		options : {
			sort : { createDate : -1 }
		}
	};
	postUser = await User.findById(postUser._id).select('-hash').populate(populateQuery);
    
	return { ...postUser.toObject() };
     
}

async function updatePost(postParams){
	let oldPost = await StpdPost.find({ stpHash : postParams.stpHash });

	let updatePost = Object.assign(oldPost, postParams);

	return await updatePost.save();

}
async function getAllbyUser(requestBody){
    
	let { ownedPosts } = await User.findOne({ username : requestBody.username});

	return ownedPosts;
}
async function getCommunityLatest(){
	try {
		let populateQuery = {
			path : 'stpdResponses',
			options : {
				sort : { createDate : -1 }
			}
		};

		let returnPosts = await StpdPost.find().sort({ createDate : -1}).limit(2).populate(populateQuery).populate('voters');
        
		if(!returnPosts.length) {
			returnPosts = [EmptyPost];
		}
		
		return returnPosts;
	} catch (err) {
		return Promise.reject(err);
	}
    
}
async function getCommunityByHash(requestBody){
	return await StpdPost.findOne(requestBody);
}

async function getAllbyCommunity(rtnLimit = 10) {
	return await StpdPost.find().sort({ createdDate : -1 }).limit(rtnLimit);
}

async function getPostWithVotes(postId){
	try {
		return await StpdPost.findById(postId).populate('voters');
	} catch (err) {
		throw err;
	}
}
