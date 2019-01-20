var Tractor = require('../../Tractor.js');
var Deck = require('../../Deck.js');
var Game = require('../../Game.js');
var socket = io();

socket.emit('ha ha ha');

// myNumber = 0;

$(function () {
  socket.on('I joined room', function(myNumber){
    // This displays the player who emitted the card + the card they clicked
    console.log(myNumber);
    myNumber = myNumber;
  });

  socket.on('start room', function(gameId, currentPlayers) {
    console.log("Creating game " + gameId);
    var tractor = new Tractor(gameId);
    console.log("Adding in " + currentPlayers.length + " players to game");
    for (var i = 0; i < currentPlayers.length; i++) {
      tractor.addPlayer(currentPlayers[i]);
    }
    var game = new Game(currentPlayers);
    socket.emit('start first round dealing', tractor, game);
  });

  socket.on('start first round dealing', function(tractor, game){
    var deck = new Deck(2);
  });

  socket.on('start dealing', function(game){

  });

  socket.on('start next round', function(gameState){

  });

});
