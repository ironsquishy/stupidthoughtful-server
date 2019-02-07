const CONFIG = require('../../../../config');
const JWT  = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');

const DB = require('../../helpers/db');
const StpdPost = require('./stupidPost.model');
const User = require('../users/user.model');

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
    getCommunityByHash
};

async function getById (id){
    return await stpdPost.findById(id);
}

async function createPost (_params){
    var response = {};
    var postUser = _params.user;
    var newPost = _params.post;


    var dbQuery = { 
        ownerId : newPost._id, 
        owner : postUser.username, 
        message : newPost.message
    }
    //var postUser = await User.findOne({ username: postParams.owner });
    //var postUser = await User.findById(postParams._id);
    newPost = new StpdPost(dbQuery);

    postUser.ownedPosts.push(newPost);

    await postUser.save();
    await newPost.save();

    response.newPost = newPost;
    response.ownedPosts = postUser.ownedPosts;
    
    console.log(`New post created from ${postUser.username}`);
    return response;
     
}

async function updatePost(postParams){
    var oldPost = await StpdPost.find({ stpHash : postParams.stpHash });

    var updatePost = Object.assign(oldPost, postParams);

    return await updatePost.save();

}
async function getAllbyUser(requestBody){
    
    var { ownedPosts } = await User.findOne({ username : requestBody.username});

    return ownedPosts;
}
async function getCommunityLatest(){
    
    console.log('Get Communit latest Requested');

    var returnPosts = await StpdPost.find();
    if(!returnPosts.length) {
        returnPosts = [EmptyPost];
    }
    return returnPosts;
}
async function getCommunityByHash(requestBody){
    return await StpdPost.findOne(requestBody);
}

async function getAllbyCommunity(rtnLimit = 10) {
    return await StpdPost.find().sort({ createdDate : -1 }).limit(rtnLimit);
}