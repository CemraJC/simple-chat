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
    socket.emit('message', { message: "Hello mate! Welcome to Simple Chat.", name: "Server", style: "personal" })
    socket.on('send', function (msg) {
        if (msg.message.trim().length <= 0) {
            return false; // Can't be sending empty messages!
        } else {
            msg.message = msg.message.trim();
            console.info("New Message:", msg)
            io.sockets.emit('message', msg)
        }
    })
})
