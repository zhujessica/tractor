var socket = io();

socket.emit('I joined room')

myNumber = 0;

$(function () {
  socket.on('I joined room', function(myNumber){
    // This displays the player who emitted the card + the card they clicked
    console.log(myNumber);
    myNumber = myNumber;
  });

  $('.card').click(function() {
    var jQueryCard = $(this);
    var cardClicked = jQueryCard[0].innerText;
    console.log(myNumber);
    socket.emit('card clicked', [myNumber, cardClicked]); // emits the player who clicked the card + the card clicked
  });

  socket.on('card clicked', function(click_info){
    // This displays the player who emitted the card + the card they clicked
    console.log(click_info)
    $('#cards_clicked').append($('<li>').text("Player " + click_info[0] + ": " + click_info[1]));
  });
});
