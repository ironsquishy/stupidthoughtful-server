const passport  = require('passport');
const User = require('../restAPI/models/users/user.model');
const CONFIG = require('../../config.json');


/*Strategy References*/
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

/*Local Strategy Configurations*/
const localOpts = {};
localOpts.usernameField = 'username';
localOpts.passwordField = 'password';

async function verifyUser(username, password, done){
	try{
		
		var currentUser = await User.findOne({ username, password });

		if (!currentUser){
			return done(null, false, { message : 'Incorrect username or password...'});
		}

		return done( null, currentUser, { message : 'Successfully login'});
	} catch (err){
		return done(err);
	}
    
}
//Assign local strategy
passport.use(new LocalStrategy(localOpts, verifyUser));

/* JWT Strategy */
const JwtOpts = {};
JwtOpts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
JwtOpts.secretOrKey = CONFIG.Database.secret;

async function verifyJWT(jwtPayload, done){
	try {

		var user = await User.findById(jwtPayload.sub);
		return done(null, user);

	} catch (err ){
		return done(err);
	}
}

//Assign JWT Strategy
passport.use(new JWTStrategy(JwtOpts, verifyJWT));


/* Register strategy */
const registerOPts = {};
registerOPts.usernameField = 'username';
registerOPts.passwordField = 'password';

async function registerUserMiddleware(username, password, done){
	try {
		return done( null, username, password);

	} catch (err) {
		return done(err);
	}
}

passport.use('register', new LocalStrategy(registerOPts, registerUserMiddleware));





