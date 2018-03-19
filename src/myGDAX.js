const CONFIG = require('../config');

const GDAX = require('gdax');
//const publicClient = new GDAX.PublicClient();
const Profile = (process.env.NODE_ENV == "production") ? CONFIG.PROD :  CONFIG.TESTNET;

console.log("Key:", Profile.auth.key);
console.log("Secret Key:", Profile.auth.secret);
console.log("Passphrase:", Profile.auth.passphrase);
console.log("URI:", Profile.URI.REST);

const authedClient = new GDAX.AuthenticatedClient(
    Profile.auth.key, 
    Profile.auth.secret, 
    Profile.auth.passphrase, 
    Profile.URI.REST
);


var ltcToUSD = {};
authedClient.getProducts()
.then(res => {
    ltcToUSD = res.find(prdcts => prdcts.id == "LTC-USD");
    console.log(ltcToUSD);
})
.catch(err => {
    console.log("ERRROR:", err);
});

const webSock = new GDAX.WebsocketClient(
    ["LTC-USD"], 
    Profile.URI.WEBSOCK, 
    Profile.auth, 
    {channels : ['user', 'level2']}
);


webSock.on('open', res => console.log("Open:", res));

webSock.on('message', data => console.info("Data:", data));

webSock.on('close', res => {
    console.log(res);
    process.exit(1);
});

webSock.on('error', err => {
    console.error(err);
    process.exit(1);
});
