const CONFIG = require('../../../../config');
const JWT  = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');

const DB = require('../../helpers/db');
const { StpdPost } = require('./stupidPost.model');
const User = require('../users/user.model');

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

async function createPost (postParams){
    var postUser = await User.findOne({ username: postParams.owner });
    var newPost = new StpdPost({ ownerId : postUser._id, ...postParams });

    postUser.ownedPosts.push(newPost);

    return { User: await postUser.save(), post : await newPost.save() };  
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
    //return await User.find().populate('ownedPosts');
    return await StpdPost.find();
}
async function getCommunityByHash(requestBody){
    return await StpdPost.findOne(requestBody);
}

async function getAllbyCommunity(rtnLimit = 10) {
    return await StpdPost.find().sort({ createdDate : -1 }).limit(rtnLimit);
}