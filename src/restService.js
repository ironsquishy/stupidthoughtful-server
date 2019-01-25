var path = require('path');
var util = require('util');
var express  = require('express');
var bodyParser = require('body-parser');
var CORS = require('cors');

const PORT = 3000;
//Server Specific
var JWT = require('./restAPI/helpers/jwt');
var ErrorHandler = require('./restAPI/helpers/errors');

//Logging
var moment = require('moment');

var app = express();
var http = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(JWT());


app.use('/user', require('./restAPI/models/users/users.route'));
app.use('/test', require('./restAPI/models/test/tests.route'));
app.use('/stpdpost', CORS(), require('./restAPI/models/stupidpost/stupidPost.route'));
app.use('/voting', require('./restAPI/models/vote/vote.route'));

//Global Error...
app.use(ErrorHandler);

http.listen(PORT, () => console.log(`Server running on ${PORT} at ${moment().format('MMMM Do YYYY, h:mm:ss')}`));


