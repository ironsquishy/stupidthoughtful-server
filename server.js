/* Start of Server*/
var os = require('os');

/*Print out server network interfaces*/
var en0 = os.networkInterfaces().en0;
en0.forEach(item => {
    console.log(`Network en0: ${item.family} < ${item.address} >`);
})


require('./src');










