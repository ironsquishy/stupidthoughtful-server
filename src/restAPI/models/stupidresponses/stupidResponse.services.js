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

async function getResponsesByPost(_postId, _ownerId){
    try {
        let populateQuery = {
            path : 'stpdResponses',
            options : {
                sort : { createDate : -1 }
            }
        }

        let currentPost = await StpdPost.findById(_postId).populate(populateQuery);
        return currentPost;
        
    } catch (error){
        throw error;
    }

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

