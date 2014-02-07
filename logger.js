var mycroft = require('./mycroft.js');
var client = mycroft.Mycroft('app.json', 'localhost', 1847);
var logs = [];
var port = 7777;
var io = require('socket.io').listen(port);

client.on('APP_DEPENDENCY', function(data){
  client.up();
});

client.on('MSG_BROADCAST', function(data){
  logs.push(data.content);
  io.sockets.emit('log', data.content);
});

io.sockets.on('connection', function(socket){
  socket.emit('initial logs', logs);
});

client.connect();
client.sendManifest();
