var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var Player = require('./Player.js');
var Tractor = require('./Tractor.js');
var Deck = require('./Deck.js');
var Game = require('./Game.js');
var Card = require('./Card.js');

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

// contains about:
// owner - username of the owner
// players - username and socket id of the current players inside the room 
// name - name of the game room

var testPlayer1 = new Player(1, 'test')
var testPlayer2 = new Player(2, 'test')

// currentGames contains:
// key - id of the game room
// owner - username and socketid of the owner
// players - username and socket id of the current players inside the room 
// name - name of the game room
var currentGames = {
  '11111': {'owner': testPlayer1, 'players': [testPlayer1], 'name':'lit times' },
  '22222': {'owner': testPlayer2, 'players': [testPlayer2], 'name':'okay room'}
};

// Just a list of current game ids in the lobby mapping to their room name
var currentIds = {
  '11111': 'lit times',
  '22222': 'okay room'  
}

// The max number of room IDs that can exist
const MAX_ROOMS = 100000;

// The number of times the random ID generator will try to create an ID
const ID_ATTEMPT_LIMIT = 1000;

// There is an issue where you can have multiple users with the same username 
// but validating between frontend and backend is annoying so might do later

io.on('connection', function(socket){ 

  // This variable tells you the last part of the current url, e.g. 'lobby'
  var urlLastPath = socket.client.request.headers['referer'].split("/").pop();
  console.log("THE URL THINGY IS a" + urlLastPath + "a");
  console.log(socket.client.request.headers['referer']);

  //
  //
  // Case: Entering home screen, where you enter username
  if (urlLastPath == "") {
    socket.on('new username', function(username) {

      // Accumulates all the players inside the lobby and inside game rooms
      var currentUsers = new Set();
      for (var gameId in currentGames) {
        var playerList = currentGames[gameId]['players'];
        for (var i = 0; i < playerList.length; i++) {
          currentUsers.add(playerList[i].username);
        }
      }

      for (var socketId in currentLobbyClients) {
        currentUsers.add(currentLobbyClients[socketId]);
      }

      // If the username already exists, alerts user to make new username, else 
      // take them to the lobby
      if (currentUsers.has(username)) {
        socket.emit('username taken', username);
      } else {
        socket.emit('username valid', username);
      }

    });
  }
  // END home
  //
  //

  //
  //
  // Case: Entering the game lobby, where all the rooms exist
  else if (urlLastPath == "lobby") {

    // When a new user enters the lobby, list the rooms available in the lobby
    // to the user
    socket.on('enter lobby', function(username) {
      if (Object.values(currentLobbyClients).includes(username)) {
        console.log(username + " (another one) has entered the lobby");
      } else {
        console.log(username + " has entered the lobby");
      }

      if (!(socket.id in currentLobbyClients)) {
        currentLobbyCount += 1;
        console.log("New socket (id: " + socket.id + ") has connected to lobby");
        currentLobbyClients[socket.id] = username;
      }

      socket.emit('generate rooms', currentGames);
    });

    // When the new user tries to create a new room, it checks if it's valid,
    // creates a new id, then emits to all socket connections about this new room
    socket.on('new room', function(roomName, username) {
      console.log(username + " trying to create room " + roomName);
      let currentNames = []
      for (var gameid in currentGames) {
        currentNames.push(currentGames[gameid]['name'])
      }

      console.log("stage 1")
      // Checks if the room name already exists
      if (roomName in currentNames) {
        console.log("stage 2")
        io.sockets.connected[socket.id].emit('failed room', roomName);
      } 
      // If valid, create a random id, create a default room, and communicate to clients
      // about creation of new room
      else {
        console.log("stage 3")

        // Generates a random room ID
        // Note: it only tries ID_ATTEMPT_LIMIT times at a random ID
        // Probability-wise, it's almost impossible to fail unless almost all
        // room IDs are taken
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

        // If all the random ID's that were generated are taken
        if (randomId == "FAIL") {
          console.log("stage 4")
          socket.emit('failed room id');
        } else {
          console.log("stage 5")
          var newPlayer = new Player(socket.id, username);
          let gameDetails = {'owner': username, 'players': [], 'name': roomName};
          
          // NOTE: kind of a useless variable
          currentIds[randomId] = roomName;
          currentGames[randomId] = gameDetails;

          // Tells all other players about this new room
          socket.broadcast.emit('new room', {'gameid': randomId, 'details': gameDetails});

          console.log("stage 6")
          // Forces the owner to join the room that they created
          
          socket.emit('enter game room', randomId);
        }
      }
    });

    // // Indicates that we are trying to enter a room with a specific url
    socket.on('join game room', function(clientInfo) {
      console.log("joining game room");
      var username = clientInfo['username'];
      var gameid = clientInfo['gameid'];
      var gameDetails = currentGames[gameid];
      var currentPlayers = gameDetails['players']

      // Checks if there is enough space for a player to join
      if (currentPlayers.length >= 4) {
        io.sockets.connected[socket.id].emit('full room', gameid);
      }

      // If enough space, add the new player and tell socket to enter room
      else {
        // var newPlayer = new Player(socket.id, username);
        // currentPlayers.push(newPlayer)
        io.sockets.connected[socket.id].emit('enter game room', gameid);

        // // If a room is full, tell the owner to start the game
        // if (currentPlayers.length == 4) {
        //   // Add start button logic here
        //   var tempDetails = {"gameId": gameid, "players": currentPlayers} // change later
        //   io.sockets.connected[socket.id].emit('start room', tempDetails);
        // }
      }
    });

    socket.on('disconnect', function() {
      console.log("Player " + currentLobbyClients[socket.id] + " disconnected");
      delete currentLobbyClients[socket.id];
      currentLobbyCount -= 1;
      console.log(currentLobbyClients);
    });
  }
  // END lobby 
  //
  //

  //
  //
  // Case: Entering a specific game room
  else if (!isNaN(urlLastPath)) {
    console.log("entering room with id " + urlLastPath);
    console.log(currentGames[Number(urlLastPath)]);

    var currentPlayer = null;
    var currentGameId = urlLastPath;

    socket.on('joined game room', function(userInfo) {
      var username = userInfo['username'];
      var gameid = userInfo['gameid'];
      var game = currentGames[gameid];
      var players = game['players'];
      var owner = game['owner'];
      var newPlayer = new Player(socket.id, username);

      // This is the case where the owner of the room first joins the room
      if (owner == username) {
        game['owner'] = newPlayer;
      }

      players.push(newPlayer);

      currentPlayer = newPlayer;

      console.log(username + " has entered room")
      socket.emit('generate players', players, owner);

      // Tells every player inside the room to add the new player to their html
      for (var i = 0; i < players.length; i++) {
        let socketId = players[i].id;
        if (socketId != socket.id) {
          console.log('yeah i just broadcast to ' + socketId);
          socket.broadcast.to(socketId).emit('add new player', username);
        }
      }

      console.log('there are ' + players.length + ' current players now');

      // If there are enough players, allow the owner to start the game
      if (players.length == 3) {
        console.log('broadcasted the start game');
        socket.broadcast.to(currentGames[gameid]['owner'].id).emit('allow start');
      } else {
        socket.broadcast.to(currentGames[gameid]['owner'].id).emit('cant start');
      }

    });

    socket.on('start game', function(gameId) {
      // create start logic for game here
      console.log("creating start game logic");
      socket.broadcast.to(currentGames[gameId]['owner'].id).emit('cant start');
      var game = currentGames[gameId];
      var currentPlayers = game['players'];
      console.log("Creating game " + gameId);
      var tractor = new Tractor(gameId);
      console.log("Adding in " + currentPlayers.length + " players to game");
      for (var i = 0; i < currentPlayers.length; i++) {
        tractor.addPlayer(currentPlayers[i]);
      }
      var game = new Game(currentPlayers);
      // once tractor game is initialized, begin dealing of cards
      var deck = new Deck(2);
      deck.shuffle();
      console.log("deck shuffled, begin dealing " + deck.deck.length + " cards");
      var prevPersonDrew = true;
      var playerIndex = 1;
      while (deck.deck.length != deck.VAULT_SIZE) {
        if (prevPersonDrew) {
          prevPersonDrew = false;
          var player = currentPlayers[playerIndex];
          console.log('current player ' + player)
          socket.broadcast.to(player.id).emit('deal card');
        }
      }
      // after dealing is done, and trump is chosen, let the banker have the vault cards
      for (let i = 0; i < deck.deck.length; i++) {
        game.dealCard(game.banker);
      }
    });

    socket.on('deal card', function(gameid) {
      console.log(player.username + ' drew a card');
      game.dealCard(player);
      playerIndex = (playerIndex+1)%currentPlayers.length;
      prevPersonDrew = true;
      console.log(deck.deck.length);
    });

    // Player disconnects from the game room
    socket.on('disconnect', function() {
      var ownerSocketId = currentGames[Number(currentGameId)]['owner'].id;
      var players = currentGames[Number(currentGameId)]['players'];

      // Removes the player from currentGames
      const indexToRemove = players.indexOf(currentPlayer);
      players.splice(indexToRemove, 1);
 
      // If the owner leaves, remove the game from the lobby and
      // tell all players in the room to leave the room
      if (ownerSocketId == socket.id) {
        for (var i = 0; i < players.length; i++) {
          socket.broadcast.to(players[i].socketId).emit('closed room');  
        }

        delete currentGames[Number(currentGameId)];
        delete currentIds[Number(currentGameId)];

      } else {
        // Updates the html of each player inside the room
        for (var i = 0; i < players.length; i++) {
          console.log('told to delete player for ' + players[i].username);
          socket.broadcast.to(players[i].socketId).emit('player left room', currentPlayer);  
        }

        // Remove the start game button if it's there
        socket.broadcast.to(ownerSocketId).emit('cant start');
      }
    }) 

  } 
  // END game room 
  //
  //

  // Case: Test path
  else {

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
  }
})
