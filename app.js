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

var currentTemp, wD, windSpeed, feels_like, humidity, id;

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
            id = body.weather[0].id;

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

    
    var weatherUpdate = 'รายงานสภาพอากาศเวลา ' + getCurrentTime() + '  ' + catRandom() + '\n\n' + getEmojis(id) + ' ' + wD + ' ' + getEmojis(id) + '\n\n' 
                    + emoji.get('thermometer') +' อุณหภูมิจริง : ' + currentTemp + " °C \n"
                    + getSmiley(feels_like) + ' ให้ความรู้สึกเหมือน : ' + feels_like + " °C \n"
                    + '\u{1f4a7}' + ' ค่าความชื้น : ' + humidity + " %\n" + 
                    '\u{1f390}' + ' ความเร็วลม : ' + ConvertMetersPerSecondToKmPerHour(windSpeed) + ' Km/h';

    var tweet = {
        status: weatherUpdate
    }

    var updateName = {
        name: ' Chiba Weather ' + getEmojis(id)
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

function getEmojis(id) {

    var id_convert = Math.floor(id/100);

    console.log(id);

    if (id_convert != 8) {
        switch(id_convert) {
            case 2: console.log('thunderstorm'); return ICONS.THUNDERSTROM;
            case 3: console.log('drizzle'); return ICONS.RAIN;
            case 5: console.log('rain'); return ICONS.SHOWER_RAIN;
            case 6: console.log('snow'); return ICONS.SNOW;
            case 7: console.log('mist'); return ICONS.MIST;
        }
    } else {
        switch(id) {
            case 800: console.log('clear sky'); return ICONS.CLEAR_SKY;
            case 801: console.log('cloud 25'); return ICONS.PART_CLOUDY;
            case 802: console.log('cloud 50'); return ICONS.PART_CLOUDY;
            case 803: console.log('cloud 75'); return ICONS.CLOUD;
            case 804: console.log('cloud 100'); return ICONS.CLOUD;
        }
    }
    
}

function getSmiley(feels_like) {
    if (feels_like < 10) {
        return '\u{1f976}';
    } else if (feels_like >= 10 && feels_like < 25) {
        return '\u{1f604}';
    } else if (feels_like >= 25 && feels_like < 35) {
        return '\u{1f605}';
    } else {
        return '\u{1f975}';
    }
}

function getCurrentTime() {
    var current_time = new Date();
    current_time = current_time.toLocaleString("en-US", {timeZone: "Asia/Bangkok"});
    current_time = new Date(current_time); 

    var hours = current_time.getHours();
    var minutes = current_time.getMinutes();

    if (Math.floor(hours/10) == 0) {
        hours = "0" + hours;
    }

    if (Math.floor(minutes/10) == 0) {
        minutes = "0" + minutes;
    }

    return hours + ':' + minutes;
}

function catRandom() {
    var cat = CATS[Math.floor(Math.random() * CATS.length)];
    return cat;
}

function getWords(id) {

    var id_convert = Math.floor(id/100);

    if (id_convert != 8) {
        switch(id_convert) {
            case 2: return ICONS.THUNDERSTROM;
            case 3: return 'อย่าลืมหยิบร่มด้วยนะ ' + '\u{1f302}';
            case 5: return 'ดูแลสุขภาพกันด้วยนะ ' + '\u{1fa7a}';
            case 6: return 'Do you wanna build a snowman~ ' + ICONS.SNOWMAN;
            case 7: return 'ฝุ่น ควัน มลภาวะ อย่าลืมหยิบแมสก์ด้วยนะ ' + '\u{1f637}';
        }
    } else {
        switch(id) {
            case 800: return ICONS.CLEAR_SKY;
            case 801: return ICONS.PART_CLOUDY;
            case 802: return ICONS.PART_CLOUDY;
            case 803: return ICONS.CLOUD;
            case 804: return ICONS.CLOUD;
        }
    }

}

GetData();