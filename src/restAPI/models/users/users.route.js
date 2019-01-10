const Router = require('express').Router();
const UserServices = require('./user.services');

//Post
Router.post('/authenticate', authenticate);
Router.post('/register', register);

//Get
Router.get('/', getAll);
Router.get('/current', getCurrent);

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
    UserServices.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
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