'use strict'
const PORT = 8080;

let express = require('express');
let app = express();

let io = require('socket.io')(app.listen(PORT));


app.get('/styles.css', function (req, res) {
    res.sendFile(__dirname + "/styles.css");
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: "Hello Mate!", name: "Server" })
    socket.on('send', function (msg) {
        console.info("New Message:", msg)
        io.sockets.emit('message', msg)
    })
})
