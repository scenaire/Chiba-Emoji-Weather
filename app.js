require('dotenv').config();

const request = require('request');
var Twit = require('twit');
var emoji = require('node-emoji');
const { ICONS, CATS } = require('./icons.js');

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
    strictSSL: true
});

var currentTemp, wD, windSpeed, feels_like, humidity;

function GetData() {

    var base_url = 'https://api.openweathermap.org/data/2.5/weather?id=' + process.env.CHIBA_CITY_ID +
                    '&appid=' + process.env.OPENWEATHER_API_KEY +
                    '&units=' + process.env.UNITS + '&lang=th';

    request({url: base_url, json: true}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            currentTemp = body.main.temp;
            feels_like = body.main.feels_like;
            humidity = body.main.humidity;
            windSpeed = body.wind.speed;
            wD = body.weather[0].description;

            CleanData();
            Tweet();

        } else {
            console.log("Error triggered inside GetData function.");
            console.log(error);
        }
    });

}

function CleanData() {
    currentTemp = currentTemp.toFixed(0);
    feels_like = feels_like.toFixed(0);
    windSpeed = ConvertMetersPerSecondToKmPerHour(windSpeed);
}

function ConvertMetersPerSecondToKmPerHour(speed) {
    return (speed * 3.6).toFixed(0);
}

function Tweet() {

    // var weatherUpdate = "Currently 😎 Chiba is experiencing " + weatherDescription + " at " + currentTemp + " °C. " +
    // "humidity: " + humidity + " % and " + ConvertMetersPerSecondToKmPerHour(windSpeed) + " Km/h Wind.";

    var weatherUpdate = 'รายงานสภาพอากาศขณะนี้ ' + catRandom() + '\n\nชาวชิบะซิตี้กำลังเผชิญกับ ' + wD + '\n' +
                'อุณหภูมิ : ' + currentTemp + ' °C \nค่าความชื้น : ' + humidity + " %\n" + 'ความเร็วลม : ' + ConvertMetersPerSecondToKmPerHour(windSpeed) + ' Km/h';

    var tweet = {
        status: weatherUpdate
    }

    var updateName = {
        name: 'Ｓｃｅｎａｉｒｅ ' + emoji.random().emoji
    }

    T.post('statuses/update', tweet, callbackTweet);
    T.post('account/update_profile', updateName, callbackName);

    function callbackTweet(error) {
        if(error) {
            console.log(error);
        } else {
            console.log("Tweeted successfully!");
        }
    }

    function callbackName(error) {
        if(error) {
            console.log(error);
        } else {
            console.log("Updated successfully!");
        }
    }

    

}

function getEmojis(description) {
    if (description.includes("rain")) return ICONS.RAIN;
}

function catRandom() {
    var cat = CATS[Math.floor(Math.random() * CATS.length)];
    return cat;
}

GetData();