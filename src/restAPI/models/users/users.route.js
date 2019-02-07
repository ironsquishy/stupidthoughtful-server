const Router = require('express').Router();
const UserServices = require('./user.services');

const passport = require('passport');

//Post
Router.post('/authenticate', authenticate);
Router.post('/register', passport.authenticate('register', { session : false }), register);

//Get
Router.get('/', getAll);
Router.get('/current', passport.authenticate('jwt', { session : false }), getCurrent);
/* Status of allowing to post */
Router.get('/allowed', passport.authenticate('jwt', { session : false }), allowedToPost);

//Put
Router.put('/:id', update);

//Delete
Router.delete('/:id', deletHTTP);

module.exports = Router;

function authenticate(req, res, next){
    UserServices.authenticate(req.body)
    .then(user =>  user ? res.json(user) : res.status(400).json({ message : 'Username or password incorrect'}))
    .catch(err => next(err));
}
function register(req, res, next){
    console.log('Called router register:', req.body);
    //res.json({ message : 'Successful!'});
    UserServices.create(req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function getAll(req, res, next){
    UserServices.getAll()
    .then(users => res.json(users))
    .catch( err => next(err));
}

function getCurrent(req, res, next){

    UserServices.includePosts(req.user)
    .then(populatedUser => populatedUser ? res.json(populatedUser) : res.sendStatus(404))
    .catch(err => next(er));

    // UserServices.getById(req.user.sub)
    // .then(user => user ? res.json(user) : res.sendStatus(404))
    // .catch(err => next(err));
}

function getById(req, res, next){
    UserServices.getById(req.params.id)
    .then( user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function update(req, res, next){
    UserServices.delete(req.params.id)
    .then(() => res.json({message : 'success'}))
    .catch(err => next(err));
}

function deletHTTP(req, res, next){
    UserServices.delete(req.params.id)
    .then(() => res.json({ message : 'success' }))
    .catch(err => next(err));
}

function allowedToPost(req, res, next){
    res.json(req.user.allowedPost);
}