require('dotenv').config();

const req = require('request');
var TwitterBot = require("node-twitterbot").TwitterBot;
const { ICONS } = require('./icons.js');


// T.post('statuses/update', {status: icon + " ทดสอบแรนด้อมอีโมจิ"}, function(err, data, response){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });