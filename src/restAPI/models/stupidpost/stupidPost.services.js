const CONFIG = require('../../../../config');
const JWT  = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');

const DB = require('../../helpers/db');
const StpdPost = require('./stupidPost.model');

module.exports = {
    getById,
    createPost,
    updatePost,
    getAll
};

async function getById (id){
    return await stpdPost.findById(id);
}

async function createPost (postParams){
    var newPost = new StpdPost(postParams);

    return await newPost.save();
}

async function updatePost(postParams){
    var oldPost = await StpdPost.find({ stpHash : postParams.stpHash });

    var upadetedPost = Object.assign(oldPost, postParams);

    return await updatePost.save();

}
async function getAll(){
    return await StpdPost.find();
}