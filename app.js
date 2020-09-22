const req = require('request');
var Twit = require('twit');
const { CONSUMER_SECRET, ICONS } = require('./config.js');

//App own modules
const config = require('./config.js');

var T = new Twit({
    consumer_key: config.CONSUMER_KEY,
    consumer_secret: config.CONSUMER_SECRET,
    access_token: config.ACCESS_TOKEN,
    access_token_secret: config.ACCESS_TOKEN_SECERT,
    timeout_ms: 60*1000,
    strictSSL: true,
});

T.post('statuses/update', {status: ICONS.SNOW + " ลองทวิตจาก Node.js เป็นภาษาไทยพร้อมอีโมจิ"}, function(err, data, response){
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});