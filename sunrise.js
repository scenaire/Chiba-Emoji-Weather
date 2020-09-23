require('dotenv').config();

const request = require('request');
var Twit = require('twit');
var emoji = require('node-emoji');
const { CATS } = require('./icons.js');

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
    strictSSL: true
});

var sunrise, sunrise_time;

function GetData() {

    var base_url = 'https://api.openweathermap.org/data/2.5/weather?id=' + process.env.CHIBA_CITY_ID +
                    '&appid=' + process.env.OPENWEATHER_API_KEY +
                    '&units=' + process.env.UNITS + '&lang=th';

    request({url: base_url, json: true}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            
            sunrise = body.sys.sunrise;
            CleanData();
            Tweet();

        } else {
            console.log("Error triggered inside GetData function.");
            console.log(error);
        }
    });

}

function CleanData() {
    sunrise = new Date(sunrise*1000);
    sunrise = sunrise.toLocaleString("en-US", {timeZone: "Asia/Tokyo"});
    sunrise = new Date(sunrise);
    var hours = sunrise.getHours();
    var minutes = "0" + sunrise.getMinutes();
    sunrise_time = hours + ":" + minutes.substr(-2);
}

function Tweet() {

    var sunrise_tweet = 'อรุณสวัสดิ์ ' + catRandom() + '\n\nพระอาทิตย์ขึ้น ' + emoji.get('sunrise') + ' '+sunrise_time+' น.';

    var tweet = {
        status: sunrise_tweet
    }

    T.post('statuses/update', tweet, callbackTweet);

    function callbackTweet(error) {
        if(error) {
            console.log(error);
        } else {
            console.log("Tweeted successfully!");
        }
    }
}

function catRandom() {
    var cat = CATS[Math.floor(Math.random() * CATS.length)];
    return cat;
}

GetData();
