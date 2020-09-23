require('dotenv').config();

const express = require('express');
const app = express();
var http = require('http');
const axios = require('axios');

var twitterAPI = require('node-twitter-api');

// const twitter = new twitterAPI({
//     consumerKey: process.env.CONSUMER_KEY,
//     consumerSecret: process.env.CONSUMER_SECRET,
//     callbackUrl: 'https://cryptic-mountain-31502.herokuapp.com/callback'
// })

app.get('/', function(req,res) {
    res.sendFile('index.html', {root: __dirname})
});

app.get('/authorize', function(req, res) {
    
    const twitter = new twitterAPI({
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackUrl: 'https://cryptic-mountain-31502.herokuapp.com/callback'
    });

    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            console.log("Got oauth token");
            console.log('oauth token: ' + requestToken);
            console.log('oauth token secret: ' + requestTokenSecret );

            res.redirect(twitter.getAuthUrl(requestToken, {}));
        }
    })

});

app.get('/callback', function(req, res) {

    const twitter = new twitterAPI({
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackUrl: 'https://cryptic-mountain-31502.herokuapp.com/callback'
    });

    var request_Token = '';
    var request_TokenSecret = '';
    var oauth_verifier = '';
    
    twitter.getAccessToken(request_Token, request_TokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            console.log("accessToken: " + accessToken);
            console.log("accessTokenSecret: " + accessTokenSecret);
        }
    });

    res.send('complete!');

});

app.listen(process.env.PORT);