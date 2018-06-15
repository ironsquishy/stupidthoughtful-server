const GDAX = require('gdax');
const QueryString = require('querystring');
const Axios = require('axios');

class GdaxAPI {
    constructor() {

    }

    getHistoricRate(ProductID = "BTC-USD", url = null, param = {start : null, end : null, granularity : 3600}) {
        
        url = !url &&  "https://api.gdax.com/products/"+ ProductID + "/candles?" + QueryString.stringify(param);
        
       return  Axios.get(url)
        .then(this.parseData)
        .catch(err => console.log(err));
        
    }

    parseData(res){
        //Ex. res.data = [[ time, low, high, open, close, volume ], ...]
        let data = res.data;
        var dataSet = [];
        data.forEach(d => {
            dataSet[dataSet.length] = {
                date : new Date(d[0] * 1000),
                low : d[1],
                high : d[2],
                open : d[3],
                close : d[4],
                volume : d[5]
            };
        });

        dataSet.sort((a,b) => {
            return new Date(a.date) - new Date(b.date);
        });
        return dataSet;
    }
}

module.exports =  new GdaxAPI();