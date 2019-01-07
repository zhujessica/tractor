var socket = io();

socket.emit('enter lobby', username);

// Cleans input incase of bad usernames!!!!
const cleanInput = (input) => {
    return $('<div/>').text(input).html();
}

$(function () {
	socket.on('generate rooms', function(rooms) {
	    console.log(username);
	    console.log(rooms);
	    var gameRooms = $(".gameList");

	    for (var room in rooms){
	    	gameRooms.append("<li><a class='room' href='/room/" + room + "'>" + room + " <br> owner: " + rooms[room].owner + "</li></a>");
    };

    $("#createRoom").click(function() {
    	var roomName = cleanInput($("#roomName").val().trim());
    	console.log('room name: ' + roomName)
    	if (roomName.length > 15 || roomName.length < 1) {
    		alert("Room name must be from 1-15 characters in length");
    	} else {
    		$("#roomName").val("");
    		socket.emit('new room', roomName, username);
    	}
    });

    socket.on('failed room', function(roomName) {
    	alert("Room name " + roomName + " already exists!");
    });

    socket.on('new room', function(newGame) {
    	let gameName = newGame['name'];
    	let gameDetails = newGame['details'];
    	gameRooms.append("<li><a class='room' href='/room/" + gameName + "'>" + gameName + " owner: " + gameDetails.owner + "</li></a>");
    });
  })
});

// $(document).ready(function() {
//   $(document).on("click", ".room", function(){
//     var jQueryRoom = $(this);
//     var roomName = jQueryRoom[0].id;
//     console.log("You clicked on room " + roomName);
//   });
// });
