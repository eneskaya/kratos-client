var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

console.log("Listening on http://localhost:3000");

app.get('/', function (request, response) {
    response.sendStatus(200);
});

io.on('connection', function( socket ) {
   console.log('A connection was made!', socket);
});