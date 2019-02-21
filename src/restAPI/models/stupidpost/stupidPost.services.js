const CONFIG = require('../../../../config');
const JWT  = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');

const DB = require('../../helpers/db');
const StpdPost = require('./stupidPost.model');
const User = require('../users/user.model');

const moment = require('moment');

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
    //var postUser = await User.findOne({ username: postUser.username });
    //postUser = await User.findById(postUser._id);
    newPost = new StpdPost(dbQuery);

    postUser.ownedPosts.push(newPost);

    postUser.lastPostDate = Date.now();
    postUser.nextPostDate = new moment().add(3, 'm').toDate();
    postUser.allowedPost = false;

    await postUser.save();
    await newPost.save();

    let populateQuery = {
        path : 'ownedPosts',
        options : {
            sort : { createDate : -1 }
        }
    }
    postUser = await User.findById(postUser._id).select('-hash').populate(populateQuery);
    
    return { ...postUser.toObject() };
     
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
    
    var returnPosts = await StpdPost.find().sort({ createDate : -1}).limit(2);
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

