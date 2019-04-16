const StpdResponse = require('./stupidResponses.model');
const StpdPost = require('../stupidpost/stupidPost.model');
const User = require('../users/user.model');

const MockResponseData = [
    {
        owner : 'ironsquishy',
        message : 'Hey look at me I made a response.',
        postId : 1234,
        ownerId : 4356,
        responseId : 1231895490,
        votes : 3
    },
    {
        owner : 'Thor',
        message : 'You humans are some crazy individuals.',
        postId : 3456,
        ownerId : 1076,
        responseId : 42318952342,
        votes : 9
    },
    {
        owner : 'Captain America',
        message : 'YEAH!! boy...',
        postId : 3377,
        ownerId : 8964,
        responseId : 5255642222,
        votes : 7
    },
    {
        owner : 'Spiderman',
        message : 'What happen to me?',
        postId : 8899,
        ownerId : 1000,
        responseId : 67832467,
        votes : 1
    }
]

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
    console.log(`Get response for post => ${_postId}`);
    return MockResponseData;
    //return await StpdResponse.find({ postId : _postId});

}

async function createResponse(newResponse){
    try {
        
        newResponse = new StpdResponse(newResponse);
        let currentPost = await StpdPost.findById(newResponse.postId);

        currentPost.stpdResponses.push(newResponse);

        await newResponse.save();

        return currentPost.save();

    } catch(error){
        return Promise.reject(error);
    }

    
}

async function updateResponse(updateParams){

}

async function deleteResponse(responseId){

}

