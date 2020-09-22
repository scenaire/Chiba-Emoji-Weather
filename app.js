const req = require('request');
var TwitterBot = require("node-twitterbot").TwitterBot;
const { ICONS } = require('./config.js');

//App own modules
const config = require('./config.js');

var Bot = new TwitterBot({
    consumer_key: config.CONSUMER_KEY,
    consumer_secret: config.CONSUMER_SECRET,
    access_token: config.ACCESS_TOKEN,
    access_token_secret: config.ACCESS_TOKEN_SECERT,
});

var random = Math.floor(Math.random() * 8);
var icon = '\u{1F478}';

switch(random) {
    case 1: icon = ICONS.CLOUD; break;
    case 2: icon = ICONS.HAZE; break;
    case 3: icon = ICONS.PART_CLOUDY; break;
    case 4: icon = ICONS.RAIN; break;
    case 5: icon = ICONS.SNOW; break;
    case 6: icon = ICONS.SUN; break;
    case 7: icon = ICONS.THUNDERSTROM; break;
    default: icon = ICONS.SNOWMAN;
}

let phrase = icon + " ทดสอบแรนด้อมอีโมจิ"

Bot.tweet(phrase);

// T.post('statuses/update', {status: icon + " ทดสอบแรนด้อมอีโมจิ"}, function(err, data, response){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });