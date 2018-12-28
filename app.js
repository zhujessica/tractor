var express = require('express');
var path = require('path');

// This is where routing code will live (ie logic for url redirection)
// (should only be used for determining what room to go into)
//var routes = require('./routes/index');

// Initialize App
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Insert favicon line here
// app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

server.listen(3000, function() {
  console.log("Server is now running on port 3000");
});

var clients = {};
var count = 0;
var lastSocket = 0;

io.on('connection', function(socket){       // Whenever socket.io detects a new connection, this function runs.
  if (!(socket.id in clients)){
  	count += 1;
  	console.log("New player connected");          // this particular instance is given the variable name "socket"
  	clients[socket.id] = "player" + count.toString();
  }

  lastSocket = socket.id

  console.log("id:" + socket.id);
  console.log(clients[socket.id] + " has logged in");

  socket.on('disconnect', function() {
    console.log("Player disconnected");
    delete clients[socket.id]
  })

  socket.on('chat message', function(msg){  // If the socket that is connected sends a 'chat message'
    console.log('message: ' + msg);         // We print the statement in the console and
    console.log('players active: ' + Object.values(clients))
    io.emit('chat message', [clients[socket.id], msg]);           // io.emit sends this message to EVERYONE connected
    io.sockets.connected[lastSocket].emit("secret-message", msg[1]);
    // io.sockets.connected[clients.mheap.socket].emit('private-message',
  });
})
