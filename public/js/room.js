var Tractor = require('../../Tractor.js');
var Deck = require('../../Deck.js');
var Game = require('../../Game.js');
var socket = io();

socket.emit('joined game room', {'gameid':gameid, 'username':username});

// myNumber = 0;

// called whenever a player clicks the deal card button (button not made yet)
function dealCardNotify() {
  socket.emit('deal card');
}

function chooseTrumpNotify() {
  socket.emit('player chose trump', {'player': player, 'trumpSuit': trumpSuit});
}

$(function () {
  socket.on('I joined room', function(myNumber){
    // This displays the player who emitted the card + the card they clicked
    console.log(myNumber);
    myNumber = myNumber;
  });

  // Generate all players that inside the room right now
  socket.on('generate players', function(playerList, owner){
    var players = $(".players");
    for (var i = 0; i < playerList.length; i++) {
      var username = playerList[i].username;
      players.append("<li id=\"" + username + "\">" + username + "</li>");
    }

    if (username == owner.username) {
      $('#title').text($('#title').text() + " (Owner)");
    }
  });

  // Whenever a new player joins, add the username to the list of players
  socket.on('add new player', function(username) {
    var players = $(".players");
    players.append("<li id=\"" + username + "\">" + username + "</li>");
  });

  // When another player leaves the room, remove the html for now
  socket.on('player left room', function(player) {
    var username = player.username;
    document.getElementById(username).outerHTML = "";
  });

  socket.on('allow start', function() {
    console.log('received the signal to start');
    $("body").append("<button type='button' id='startButton'>Start Game</button>");
  });

  // Removes the start button if it's allowed
  socket.on('cant start', function() {
    var startButton = document.getElementById("startButton");
    if (startButton) {
      startButton.outerHTML = "";
    }
  });

  socket.on('closed room', function() {
    // SOME LOGIC THAT TAKES YOU BACK TO THE LOBBY
  });

  socket.on('start game', function(tempDetails) {
    var gameId = tempDetails[gameId];
    var currentPlayers = tempDetails[currentPlayers];
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
    while (!deck.isEmpty()) {
      for (var i = 0; i < currentPlayers.length; i++) {
        let player = currentPlayers[i];
        showDealCardButton(player); // function that allowed player to click button
        socket.on('deal card', function() {
          game.dealCard(player);
        });
      }
    }
  });

  socket.on('player chose trump', function(trumpInfo) {
    var trumpSuit = trumpInfo.suit;
    var player = trumpInfo.player; // only relevant for the first round
    game.trumpSuit = trumpSuit;
    if (firstRound) {
      game.banker = player;
    }

  })

  socket.on('start round', function(game) {
    // game will be game object
    // round implementation here
  });

});
