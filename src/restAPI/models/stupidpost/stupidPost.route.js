const Router = require('express').Router();
const StpdPostServices = require('./stupidPost.services');

/*Post*/
Router.post('/create', createStpdPost);
Router.post('/update', updateStpdPost);

/*Get User*/
Router.get('/', function(req, res){
    res.json({ message : 'success'});
});
Router.get('/all', getAllUser);
Router.get('/:stpdHash', getUserPostByHash);
Router.get('/latest', getUserLatest);

/*Get Global*/
Router.get('/community/all', getCommunityAll);
Router.get('/community/latest', getCommunityLatest);
Router.get('/community/:stpdHash', getCommunityByHash);

/*Put*/
Router.put('/:stpdHash', updateStpdPost);

/*Delete */
Router.delete('/:stpdHash', deleteStpdPost);

module.exports = Router;

function createStpdPost(req, res, next){
    
    StpdPostServices.createPost(req.body)
    .then( resPost => resPost ? res.json(resPost) : res.json({}))
    .catch(err => next(err));
}

function updateStpdPost(req, res, next){

}

function getAllUser(req, res, next){
    StpdPostServices.getAllbyUser(req.body)
    .then(resPosts => resPosts ? res.json(resPosts) : res.json({}))
    .catch(err => next(err))
}

function getUserPostByHash(req, res, next){

}

function getUserLatest(req, res, next){

}

function getCommunityLatest(req, res, next){
   
    StpdPostServices.getCommunityLatest()
    .then(recentPost => recentPost ? res.json(recentPost) : res.json({}))
    .catch(err => next(err));
}

function getCommunityAll(req, res, next){
    StpdPostServices.getAllbyCommunity(req.params.limit)
    .then(posts => posts ? res.json(posts) : res.json({}))
    .catch(err => next(err));
}

function getCommunityByHash(req, res, next){
    StpdPostServices.getCommunityByStpdHash(req.params.stpdHash)
    .then(stpdPost => res.json(stpdPost))
    .catch(err => next(err));
}

function deleteStpdPost(req, res, next) {
    
}
