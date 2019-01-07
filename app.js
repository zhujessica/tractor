var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');

// Initialize App
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// app.use(favicon(__dirname + '/public/images/favicon.ico'));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// This is where routing code lives
var routes = require('./routes/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use('/', routes);

server.listen(3000, function() {
  console.log("Server is now running on port 3000");
});

var clients = {};
var count = 0;
var lastSocket = 0;
var currentGames = {
  'lit times': {'owner': 'daniel', 'numPeople': '1'},
  'okay room': {'owner': 'daniel', 'numPeople': '1'}
};

var currentPlayers = {};

io.on('connection', function(socket){       // Whenever socket.io detects a new connection, this function runs.
  if (!(socket.id in clients)){
  	count += 1;
  	clients[socket.id] = "player" + count.toString();
  }

  console.log("SOCKET " + socket.id + " has connected");
  console.log(clients);
  lastSocket = socket.id;

  // random thought: MAKE THE LOBBY PAGE A FORM TOO SO YOU CAN PASS THE USERNAME TOO INTO THE ROUTE TOO??
  socket.on('I joined room', function(roomName) {
    // when a new user enters the room, everyone in the room should get notified
    io.sockets.connected[socket.id].emit('I joined room', clients[socket.id]);
  });

  socket.on('enter lobby', function(username) {
    console.log(username + " has entered the lobby");
    io.sockets.connected[socket.id].emit('generate rooms', currentGames);
  });

  socket.on('new room', function(roomName, username) {
    console.log(username + " trying to create room " + roomName);
    if (roomName in currentGames) {
      io.sockets.connected[socket.id].emit('failed room', roomName);
    } else {
      let gameDetails = {'owner': username, 'numPeople': '1'};
      currentGames[roomName] = gameDetails;
      io.emit('new room', {'name': roomName, 'details': gameDetails});
    }
  });

  socket.on('disconnect', function() {
    console.log("Player disconnected");
    delete clients[socket.id];
    console.log(clients);
  });

  socket.on('card clicked', function(cardInfo) {
    console.log('Card Clicked: ' + cardInfo);                // We print the statement in the console and
    io.emit('card clicked', [cardInfo[0], cardInfo[1]]); // io.emit sends this message to EVERYONE connected
  });

  socket.on('chat message', function(msg){  // If the socket that is connected sends a 'chat message'
    console.log('message: ' + msg);         // We print the statement in the console and
    console.log('players active: ' + Object.values(clients))
    io.emit('chat message', [clients[socket.id], msg]);           // io.emit sends this message to EVERYONE connected
    io.sockets.connected[lastSocket].emit("secret-message", msg[1]);
    // io.sockets.connected[clients.mheap.socket].emit('private-message',
  });
})
