var socket = io();

socket.emit('ha ha ha');

// myNumber = 0;

$(function () {
  socket.on('I joined room', function(myNumber){
    // This displays the player who emitted the card + the card they clicked
    console.log(myNumber);
    myNumber = myNumber;
  });

  socket.on('full room', function(gameDetails) {
    
  })

});
