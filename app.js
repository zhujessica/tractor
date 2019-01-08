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

var currentLobbyClients = {};
var currentLobbyCount = 0;
var currentGames = {
  'lit times': {'owner': 'test', 'players': ['test'], 'id': '11111'},
  'okay room': {'owner': 'test', 'players': ['test'], 'id': '22222'}
};
var currentIds = {
  '11111': 'lit times',
  '22222': 'okay room'  
}

const MAX_ROOMS = 100000;
const ID_ATTEMPT_LIMIT = 1000;

// There is an issue where you can have multiple users with the same username 
// but validating between frontend and backend is annoying so might do later

io.on('connection', function(socket){       // Whenever socket.io detects a new connection, this function runs.
  
  // This variable tells you the last part of the current url, e.g. 'lobby'
  var urlLastPath = socket.client.request.headers['referer'].split("/").pop();

  if (urlLastPath == "lobby") {

    // When a new user enters the lobby, list the rooms available in the lobby
    // to the user
    socket.on('enter lobby', function(username) {
      if (Object.values(currentLobbyClients).includes(username)) {
        console.log(username + " (a second one) has entered the lobby");
      } else {
        console.log(username + " has entered the lobby");
      }

      if (!(socket.id in currentLobbyClients)) {
        currentLobbyCount += 1;
        console.log("New socket (id: " + socket.id + ") has connected to lobby");
        currentLobbyClients[socket.id] = username;
      }

      io.sockets.connected[socket.id].emit('generate rooms', currentGames);
    });

    // When the new user tries to create a new room, it checks if it's valid,
    // creates a new id, then emits to all socket connections about this new room
    socket.on('new room', function(roomName, username) {
      console.log(username + " trying to create room " + roomName);
      if (roomName in currentGames) {
        io.sockets.connected[socket.id].emit('failed room', roomName);
      } else {
        let currentCount = 0
        let randomId = Math.round(Math.random()*MAX_ROOMS);
        while (randomId in currentIds) {
          randomId = Math.round(Math.random()*MAX_ROOMS);
          currentCount += 1;
          if (currentCount > ID_ATTEMPT_LIMIT)  {
            randomId = "FAIL";
            break
          }
        }

        if (randomId == "FAIL") {
          io.sockets.connected[socket.id].emit('failed room id');
        } else {
          let gameDetails = {'owner': username, 'players': [username], 'id': randomId};
          currentIds[randomId] = roomName;
          currentGames[roomName] = gameDetails;
          io.emit('new room', {'name': roomName, 'details': gameDetails});
        }
      }
    });

    socket.on('disconnect', function() {
      console.log("Player " + currentLobbyClients[socket.id] + " disconnected");
      delete currentLobbyClients[socket.id];
      currentLobbyCount -= 1;
      console.log(currentLobbyClients);
    });
  } else if (!isNaN(urlLastPath)) {
    // Indicates that we are inside a room with a specific url
    return
  }

  //   socket.on('card clicked', function(cardInfo) {
  //     console.log('Card Clicked: ' + cardInfo);                // We print the statement in the console and
  //     io.emit('card clicked', [cardInfo[0], cardInfo[1]]); // io.emit sends this message to EVERYONE connected
  //   });

  //   socket.on('chat message', function(msg){  // If the socket that is connected sends a 'chat message'
  //     console.log('message: ' + msg);         // We print the statement in the console and
  //     console.log('players active: ' + Object.values(clients))
  //     io.emit('chat message', [clients[socket.id], msg]);           // io.emit sends this message to EVERYONE connected
  //     io.sockets.connected[lastSocket].emit("secret-message", msg[1]);
  //     // io.sockets.connected[clients.mheap.socket].emit('private-message',
  //   });
  // }
})
