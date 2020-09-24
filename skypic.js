require('dotenv').config();

var Twit = require('twit');
const imageToBase64 = require('image-to-base64');
const { response } = require('express');

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
    strictSSL: true
});

function tweet() {

    var sky_pic = 'https://i.ibb.co/HzHWfvY/clear-sky.jpg';

    imageToBase64(sky_pic)
        .then(
            (response) => {

                var picture_source = {
                    image: response
                }

                T.post('account/update_profile_image', picture_source, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('update picture successfully.');
                    }
                });
            }
        ).catch((error) => {console.log(error);})



}



tweet();