var socket = io();

socket.emit('enter lobby', username);

// Cleans input incase of bad usernames!!!!
const cleanInput = (input) => {
    return $('<div/>').text(input).html();
}

function post() {

    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", $(this).attr('id'));

    var usernameField = $('<input></input>');

    usernameField.attr("type", "hidden");
    usernameField.attr("name", "username");
    usernameField.attr("value", username);

    form.append(usernameField);

    // The form needs to be a part of the document in
    // order for us to be able to submit it.
    $(document.body).append(form);
    form.submit();
};

$(function () {
	socket.on('generate rooms', function(rooms) {
	    console.log(username);
	    console.log(rooms);
	    var gameRooms = $(".gameList");

	    for (var room in rooms){
	    	gameRooms.append("<li id=\"" + rooms[room].id + "\"><a><b>" + room + "</b> &emsp; owner: " + rooms[room].owner + " &emsp; url: " + rooms[room].id + "</a></li>");
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

    socket.on('failed room id', function() {
        alert("Literally every room id is taken hopefully this never happens");
    });

    socket.on('new room', function(newGame) {
    	let gameName = newGame['name'];
    	let gameDetails = newGame['details'];
        let gameId = gameDetails['id']
    	gameRooms.append("<li id=\"" + gameId + "\"><a><b>" + gameName + "</b> &emsp; owner: " + gameDetails.owner + " &emsp; url: " + gameId + "</a></li>");
        $("#" + gameId).click(post)
    })

    // ONLY FOR TESTING PURPOSES - set a click handler for the existing list items (test rooms)
    $("li").click(post)
    


    // $("li").click(function() {
    //     var roomId = $(this).get(0).id;
    //     const data = {username:'test'};
    //     $.post("/lobby", data, function(data, success) {
    //         alert("Data: " + data + "\nStatus: " + status);
    //     })
    // }

})
});