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
  socket.on('generate players', function(playerList){
    var players = $(".players");
    for (var i = 0; i < playerList.length; i++) {
      players.append("<li>" + playerList[i].username + "</li>");
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


});
