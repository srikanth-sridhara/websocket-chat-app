var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var allClients = [];

io.on('connection', function(socket){
    allClients.push(socket);
    
    socket.on('disconnect', function(){
        if (socket.name != undefined) {
            console.log(socket.name + ' disconnected');
            socket.broadcast.emit('general message', socket.name + ' Disconnected');
        }
        
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
    });

    socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('nickname', function(nickname){
        socket.name = nickname;
        console.log(nickname + ' connected');
        io.emit('nickname', nickname);
        io.emit('general message', socket.name + ' Connected');
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
