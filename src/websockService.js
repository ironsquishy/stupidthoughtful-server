const CONFIG = require('../config');

var moment = require('moment');
var appWebSoc = require('express')();
var newServer = require('http').Server(appWebSoc);
var io = require('socket.io')(newServer);

var GdaxWebsock = require('./websocks/gdax');

const Profile = (process.env.NODE_ENV == "production") ? CONFIG.PROD :  CONFIG.TESTNET;
var port = 3001;

newServer.listen(port, () => console.log('Started websock server on 3001...'));

var btcTicker = io.of('/websock/btc');
var ltcTicker = io.of('/websock/ltc');



btcTicker.on('connection', (socket) => {
    console.log('User connected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));

    let webSock = new GdaxWebsock(Profile, {product_ids: ['BTC-USD'], channels:['user', 'level2']});

    webSock.connect();

    webSock.on('open', res => {
        console.log('GDAX websock open at', moment().format('MMMM Do YYYY, h:mm:ss a'));
        socket.emit('greet', {connection: true});
    });

    webSock.on('message', msg => socket.emit('ticker', msg));
    
    socket.on('disconnect', () => {
        webSock.disconnect();
        console.log('User disconnected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));
    });
});

ltcTicker.on('connection', (socket) => {
    console.log('User connected BTC-USD ticker at:', moment().format('MMMM Do YYYY, h:mm:ss a'));

    let webSock = new GdaxWebsock(Profile, {product_ids: ['LTC-USD'], channels:['user', 'level2']});

    webSock.connect();

    webSock.on('open', res => {
        console.log('GDAX websock open at', moment().format('MMMM Do YYYY, h:mm:ss a'));
        socket.emit('greet', {connection: true});
    });

    webSock.on('message', msg => socket.emit('ticker', msg));
    
    socket.on('disconnect', () => {
        webSock.disconnect();
        console.log('User disconnected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));
    });
});





