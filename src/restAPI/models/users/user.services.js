const CONFIG = require('../../../../config');
const JWT  = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');

const DB = require('../../helpers/db');
const User = require('./user.model');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete : deleteHTTP,
    includePosts
};

async function authenticate({ username, password }){
    var user = await User.findOne({ username });

    if(user && Bcrypt.compareSync(password, user.hash)){
        var { hash, ...userWithoutHash } = user.toObject();
        var token = JWT.sign({sub : user.id }, CONFIG.Database.secret, { expiresIn : '30m'});
        
        console.log(`User logged in: ${username} at ${new Date().toLocaleDateString()}`);
        return { ...userWithoutHash, token };
    }

}


async function getAll (){
    return await User.find().select('-hash');
}

async function getById(id){
    return await User.findById(id).select('-hash');
}

async function create(userParam){
    
    if(await User.findOne({ username : userParam.username })){
        throw `Username ${userParam.username} is already taken`;
    }

    var user = new User(userParam);

    if(userParam.password){
        user.hash = Bcrypt.hashSync(userParam.password, 10);
    }
    user = await user.save();

    console.log(`New user created: ${user.username} at ${new Date().toLocaleDateString()}`);

    if(user && Bcrypt.compareSync(userParam.password, user.hash)){
        var { hash, ...userWithoutHash } = user.toObject();
        var token = JWT.sign({sub : user.id }, CONFIG.Database.secret);
        return { ...userWithoutHash, token };
    }
    
}

async function update(id, userParam){
    var user = await User.findById(id);

    if (!user) throw 'User not found';

    if( user.username !== userParam.username && await User.findOne({ username : userParam.username })){
        throw `Username ${userParam.username} is already taken`;
    }

    if(userParam.password){
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    Object.assign(user, userParam);

    await user.save();
}

async function deleteHTTP(id){
    await User.findByIdAndRemove(id);
}

async function includePosts(_user){
    try {
        return await User.findById(_user._id).populate('ownedPosts');

    } catch (err) {
        return Promise.reject(err);
    }
}