const express = require('express');
const {
    Server
} = require('socket.io');

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = new Server(server);
app.use(express.static(__dirname + "/public"));

const log = [];
io.on('connection', (socket) => {
    socket.broadcast.emit('newUser');
    socket.emit('chatLog',log);
    socket.on('message', data => {
        log.push(data);
        console.log(data);
        io.emit('chatLog',log);
    })
})