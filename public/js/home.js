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
		socket.emit('new username', $("#username")[0].value);
	}); 

	socket.on('username valid', function(username) {
		post(username);
	});

	socket.on('username invalid', function(username) {
		alert(username + " is already taken");
	});
});

// function validateForm() {
// 	var x = document.forms["form_name"]["fname"].value;
//   	if (x == "") {
// 	    alert("Name is already taken!");
// 	    return false;
// 	  }
// }