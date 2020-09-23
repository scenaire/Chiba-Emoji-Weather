const express = require('express');
const app = express();

app.get('/', function(req,res) {
    res.sendFile('index.html', {root: __dirname})
});

app.get('/callback', function(req, res) {
    res.send('hello world');
});

app.listen(3000 || process.env.PORT);