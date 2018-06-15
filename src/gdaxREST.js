var path = require('path');
var util = require('util');
var express  = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var CoinbaseStrategy = require('passport-coinbase').Strategy;

var moment = require('moment');



var port = process.env.NODE_ENV || '3000';

var app = express();
var http = require('http').Server(app);

var gdaxREST = require('./restAPI/gdaxAPI');

// gdaxREST.getHistoricRate()
// .then(res => console.log(res))
// .catch(err => console.log(err));



//app.use(express.cookieParser());
//app.use(bodyParser);
//app.use(express.methodOverride());
//app.use(express.session({ secret: 'new classic' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());



// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Coinbase profile is serialized
//   and deserialized.
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });


// Use the CoinbaseStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken and refreshToken),
//   and invoke a callback with a user object.
// passport.use(new CoinbaseStrategy({
//     clientID: COINBASE_CLIENT_ID,
//     clientSecret: COINBASE_CLIENT_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/coinbase/callback",
//     scope: ["user"]
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // asynchronous verification, for effect...
//     process.nextTick(function () {
      
//       // To keep the example simple, the user's Coinbase profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the Coinbase account with a user record in your database,
//       // and return that user instead.
//       return done(null, profile);
//     });
//   }
// ));


//Routes
// app.use('/api/rest', gdaxREST);
// app.use('/api/websock', () => {
//   console.log('Requesting connection...');
//     io.on('connection', (soc) => {
//         console.log('User connected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));

//         soc.on('hello', (msg) => {
//             console.log('Client msg:', msg);
//         });

//         soc.on('disconnect', () => {
//             console.log('User disconnected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));
//         });
//     });
// });

// GET /auth/coinbase
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Coinbase authentication will involve redirecting
//   the user to coinbase.com.  After authorization, Coinbase will redirect the user
//   back to this application at /auth/coinbase/callback
//app.get('/auth/coinbase',passport.authenticate('coinbase'),(req, res) => {});

// GET /auth/coinbase/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// app.get('/auth/coinbase/callback', passport.authenticate('coinbase', { failureRedirect: '/error' }), (req, res)=>{
//     res.send(res);
// });

// app.get('/logout', function(req, res){
//   req.logout();
//   res.send('Logout');
// });

// app.get('/error', (req, res) => {
//     res.send('Error something went wrong...');
// });

app.listen(port, () => console.log('App running on port 3000 🔥'));

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) { return next(); }
//     res.redirect('/login')
//   }

