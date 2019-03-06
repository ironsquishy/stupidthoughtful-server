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

async function createResponse(newResponse){
    try {
        
        newResponse = new StpdResponse(newResponse);
        let currentPost = await StpdPost.findById(newResponse.postId);

        currentPost.stpdResponses.push(newResponse);

        await newResponse.save();

        return await currentPost.save();

    } catch(error){
        return Promise.reject(error);
    }

    
}

async function updateResponse(updateParams){

}

async function deleteResponse(responseId){

}

