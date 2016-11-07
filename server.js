'use strict'
const PORT = 8080;

let express = require('express');
let app = express();

let io = require('socket.io')(app.listen(PORT));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
