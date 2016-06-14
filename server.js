var server = require('http').Server();
var io = require('socket.io')(server);
var Redis = require('ioredis');
var redis = new Redis();

console.log("Listening on http://localhost:3000");

redis.on('message', function (channel, message) {
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});

io.on('connection', function( socket ) {
   console.log('A connection was made!', socket);
});

server.listen(3000);
