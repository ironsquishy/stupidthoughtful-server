const CONFIG = require('../config');
const GDAX = require('gdax');

var moment = require('moment');
var appWebSoc = require('express')();
var newServer = require('http').Server(appWebSoc);
var io = require('socket.io')(newServer);

const Profile = (process.env.NODE_ENV == "production") ? CONFIG.PROD :  CONFIG.TESTNET;
var port = 3001;

const webSock = new GDAX.WebsocketClient(
    ["LTC-USD"], 
    Profile.URI.WEBSOCK, 
    Profile.auth, 
    {channels : ['user', 'level2']}
);








webSock.on('error', err => {
    console.error(err);
    process.exit(1);
});




newServer.listen(port, () => console.log('Started websock server on 3001...'));

var ticker = io.of('/websock');


ticker.on('connection', (socket) => {
    console.log('User connected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));
    
    socket.emit('greet', 'you are connected');

    webSock.on('message', data => {
        socket.emit('ticker', data);
    });

    webSock.on('open', res => console.log("Open:", res));

    socket.on('msg', (msg) => {
        console.log('Client msg:', msg);
    });
    
    socket.on('disconnect', () => {
        webSock.on('close', res => {
            console.log(res);
        });
        console.log('User disconnected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));
    });
});





//GDAX REST auth client
// const authedClient = new GDAX.AuthenticatedClient(
//     Profile.auth.key, 
//     Profile.auth.secret, 
//     Profile.auth.passphrase, 
//     Profile.URI.REST
// );


// var ltcToUSD = {};
// authedClient.getProducts()
// .then(res => {
//     ltcToUSD = res.find(prdcts => prdcts.id == "LTC-USD");
//     console.log(ltcToUSD);
// })
// .catch(err => {
//     console.log("ERRROR:", err);
// });