// need nothing RN

var socket = io();

function post(username) {
    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", "/lobby");

    var usernameField = $('<input></input>');

    usernameField.attr("type", "hidden");
    usernameField.attr("name", "username");
    usernameField.attr("value", username);

    form.append(usernameField);

    $(document.body).append(form);
    form.submit();
};

$(function () {
	$("#submitButton").click(function() {
		var username = $("#username")[0].value;

		// Checks to see if the username is valid
		if (!(/^[0-9a-zA-Z]+$/.test(username) && username.length <= 12)) {
			alert("Username is invalid (at most 12 characters, must be alphanumeric)");
	    } else {
			socket.emit('new username', username);
		}
	}); 

	socket.on('username valid', function(username) {
		post(username);
	});

	socket.on('username taken', function(username) {
		alert(username + " is already taken");
	});
});