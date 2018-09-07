const CONFIG = require('../config');

var moment = require('moment');
var appWebSoc = require('express')();
var websockServer = require('http').Server(appWebSoc);
var io = require('socket.io')(websockServer);


//var GdaxWebsock = require('./websocks/coinbasePro');
//const Profile = (process.env.NODE_ENV == "production") ? CONFIG.PROD :  CONFIG.TESTNET;
var GdaxWebsock = require('gdax');

const Profile = CONFIG.PROD;
var port = 3010;

websockServer.listen(port, () => console.log('Started websock server on 3010...'));

var btcTicker = io.of('/websock/btc');
//var ltcTicker = io.of('/websock/ltc');
//var ethTicker = io.of('/websock/eth');



btcTicker.on('connection', (socket) => {
    console.log('User connected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));
    try {
        //From forked GDAX API...
        // let webSock = new GdaxWebsock(Profile, {product_ids: ['BTC-USD'], channels:['ticker']});
        //webSock.connect();
        let webSock = new GdaxWebsock.WebsocketClient(['BTC-USD'],'wss://ws-feed.pro.coinbase.com', {
            key : CONFIG.PROD.auth.key,
            secret : CONFIG.PROD.auth.secret,
            passphrase : CONFIG.PROD.auth.passphrase
        },{channels : ['ticker']});

        

        webSock.on('open', res => {
            console.log('GDAX websock open at', moment().format('MMMM Do YYYY, h:mm:ss a'));
            socket.emit('greet', {connection: true, data: res});
        });

        webSock.on('message', msg => {
            if(msg.type == 'ticker'){
                socket.emit('ticker', msg)
            }
        });

        webSock.on('error', reason => {
            console.log('Coinbase Pro error emit:', reason);
            socket.emit('close', {
                status: 'fail',
                message : reason
            })
        })

        webSock.on('close', reason => {
            console.log('Coinbase Pro closed:', reason);
            socket.emit('close', {
                status : 'fail',
                message : {
                    type : 'close',
                    message : 'Coinbase disconnected...',
                    reason : 'n/a'
                }
            });
        });
        
        socket.on('disconnect', () => {
            webSock.disconnect();
            console.log('User disconnected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));
        });
    } catch (err){
        
        console.log('Coinbase Pro error:', err);
        socket.emit('close', {
            status : 'fail',
            message : err.message
        });

    }
    
});

// ltcTicker.on('connection', (socket) => {
//     console.log('User connected BTC-USD ticker at:', moment().format('MMMM Do YYYY, h:mm:ss a'));

//     let webSock = new GdaxWebsock(Profile, {product_ids: ['LTC-USD'], channels:['ticker']});

//     webSock.connect();

//     webSock.on('open', res => {
//         console.log('GDAX websock open at', moment().format('MMMM Do YYYY, h:mm:ss a'));
//         socket.emit('greet', {connection: true});
//     });

//     webSock.on('message', msg => {
//         if(msg.type == 'ticker'){
//             socket.emit('ticker', msg)
//         }
//     });
    
//     socket.on('disconnect', () => {
//         webSock.disconnect();
//         console.log('User disconnected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));
//     });
// });

// ethTicker.on('connection', (socket) => {
//     console.log('User connected BTC-USD ticker at:', moment().format('MMMM Do YYYY, h:mm:ss a'));

//     let webSock = new GdaxWebsock(Profile, {product_ids: ['ETH-USD'], channels:['ticker']});

//     webSock.connect();

//     webSock.on('open', res => {
//         console.log('GDAX websock open at', moment().format('MMMM Do YYYY, h:mm:ss a'));
//         socket.emit('greet', {connection: true});
//     });

//     webSock.on('message', msg => {
//         if(msg.type == 'ticker'){
//             socket.emit('ticker', msg)
//         }
//     });
    
//     socket.on('disconnect', () => {
//         webSock.disconnect();
//         console.log('User disconnected at:', moment().format('MMMM Do YYYY, h:mm:ss a'));
//     });
// });





