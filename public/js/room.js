var socket = io();

socket.emit('joined game room', {'gameid':gameid, 'username':username});

// myNumber = 0;

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

});
