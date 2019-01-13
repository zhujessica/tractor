var socket = io();

socket.emit('enter lobby', username);

// Cleans input incase of bad usernames!!!!
const cleanInput = (input) => {
    return $('<div/>').text(input).html();
}

function post(gameid) {

    var form = $('<form></form>');

    console.log("THIS ID IS " + gameid)

    form.attr("method", "post");
    form.attr("action", "/" + gameid);

    var usernameField = $('<input></input>');

    usernameField.attr("type", "hidden");
    usernameField.attr("name", "username");
    usernameField.attr("value", username);

    form.append(usernameField);

    $(document.body).append(form);
    form.submit();
};

// Function called whenever a room is clicked on to try to enter
function socketClickNotify() {
    socket.emit("join game room", {'gameid':$(this).attr('id'), 'username':username});
};

$(function () {
    // When the current user enters the lobby, generate all the rooms
    // that are currently on the server
	socket.on('generate rooms', function(rooms) {
	    console.log(username);
	    console.log(rooms);
	    var gameRooms = $(".gameList");

	    for (var gameid in rooms){
            room = rooms[gameid]
	    	gameRooms.append("<li id=\"" + gameid + "\"><a><b>" + room['name'] + "</b> &emsp; owner: " + room['owner'] + " &emsp; url: " + gameid + "</a></li>");
            $("#" + gameid).click(socketClickNotify);
        }
    });

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

    socket.on('failed room id', function() {
        alert("Literally every room id is taken hopefully this never happens");
    });

    socket.on('new room', function(newGame) {
        let gameId = newGame['gameid'];
    	let gameDetails = newGame['details'];
        let gameName = gameDetails['name']

        var gameRooms = $(".gameList");
    	gameRooms.append("<li id=\"" + gameId + "\"><a><b>" + gameName + "</b> &emsp; owner: " + gameDetails.owner + " &emsp; url: " + gameId + "</a></li>");
        $("#" + gameId).click(socketClickNotify);
    });

    socket.on('full room', function(gameid) {
        alert("Room " + gameid + " is full");
    });

    socket.on('enter game room', function(gameid) {
        console.log('about to enter room');
        post(gameid);
    });

});

