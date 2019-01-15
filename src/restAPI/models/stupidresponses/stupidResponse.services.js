const StpdResponse = require('./stupidResponses.model');
const StpdPost = require('../stupidpost/stupidPost.model');
const User = require('../users/user.model');

module.exports = {
    getResponseById,
    getResponsesByUser,
    getResponsesByPost,
    createResponse,
    updateResponse,
    deleteResponse
};

async function getResponseById(id){
    return await StpdResponse.findById(id);
}

async function getResponsesByUser(_username){

    return await StpdResponse.find({owner : _username});

}

async function getResponsesByPost(_postId){

    return await StpdResponse.find({ postId : _postId});

}

async function createResponse(responseParams){
    var newResponse = new StpdResponse(responseParams);
    var currentPost = await StpdPost.findById(responseParams.postId);

    currentPost.responses.push(newResponse);
    return { newResponse : await newResponse.save(), post: await currentPost.save() };
}

async function updateResponse(updateParams){

}

async function deleteResponse(responseId){

}

