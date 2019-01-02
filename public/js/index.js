var socket = io();

$(function () {

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
    // test
  });

  $('.card').click(function() {
    var jQueryCard = $(this);
    var cardClicked = jQueryCard[0].innerText;
    socket.emit('card clicked', [playerNumber, cardClicked]); // emits the player who clicked the card + the card clicked
  });

  socket.on('card clicked', function(click_info){
    // This displays the player who emitted the card + the card they clicked
    console.log(click_info)
    $('#cards_clicked').append($('<li>').text("Player " + click_info[0] + ": " + click_info[1]));
  });
});
