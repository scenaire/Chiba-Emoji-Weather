var twitterAPI = require('node-twitter-api');

const twitter= new twitterAPI({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackUrl: 'https://cryptic-mountain-31502.herokuapp.com/callback'
  })

  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {
        console.log("I got");
    }
});