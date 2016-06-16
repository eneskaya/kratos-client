var server = require('http').Server();
var io = require('socket.io')(server);

var Redis = require("ioredis")
var redis = new Redis();

console.log("Listening on http://localhost:3000");
server.listen(3000);

io.on("connection", function( socket ) {
    console.log('A connection was made!', socket.id);
});

var pub = new Redis();

redis.subscribe('users', 'games', 'event');

redis.on('message', function (channel, message) {
    console.log('Receive message %s from channel %s', message, channel);

    try {
        message = JSON.parse(message);
        console.log(message);
    } catch (e) {
        console.log(e);
    }

    io.emit(channel + ':' + message.event, message.data);
});
