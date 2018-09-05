/*Also Referred as Coinbase Pro*/

const GDAX = require('gdax');


class GdaxWebsock extends GDAX.WebsocketClient{


    constructor(config, options){
        super(options.product_ids, config.URI.WEBSOCK, config.auth, {channels: options.channels, v2: true} );
        this.options = options;

    }

    streamProduct(id, callback){
        
        this.on('open', () => {
            this.unstreamProduct();
            this.options.product_ids = id && [id];
            this.subscribe(this.options); 
            callback('Streaming ' + id); 
        });
        
        
    }

    unstreamProduct(){
        this.unsubscribe(this.options);
    }
}

module.exports = exports =  GdaxWebsock;