var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function() {
  console.log("Server is now running...");
});

io.on('connection', function(socket){       // Whenever socket.io detects a new connection, this function runs.
  console.log("Player connected");          // this particular instance is given the variable name "socket"
  socket.on('disconnect', function() {
    console.log("Player disconnected");
  })

  socket.on('chat message', function(msg){  // If the socket that is connected sends a 'chat message'
    console.log('message: ' + msg);         // We print the statement in the console and
    io.emit('chat message', msg);           // io.emit sends this message to EVERYONE connected
  });
})
