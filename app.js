var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');

// Initialize App
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// app.use(favicon(__dirname + '/public/images/favicon.ico'));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// This is where routing code lives
var routes = require('./routes/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use('/', routes);

server.listen(3000, function() {
  console.log("Server is now running on port 3000");
});

var clients = {};
var count = 0;
var lastSocket = 0;

io.on('connection', function(socket){       // Whenever socket.io detects a new connection, this function runs.
  console.log("OHHHH BOY HERE WE GO")
  if (!(socket.id in clients)){
  	count += 1;
  	console.log("New player connected");          // this particular instance is given the variable name "socket"
  	clients[socket.id] = "player" + count.toString();
  }

  lastSocket = socket.id

  console.log("id:" + socket.id);
  console.log(clients[socket.id] + " has logged in");

  socket.on('disconnect', function() {
    console.log("Player disconnected");
    delete clients[socket.id];
  });

  socket.on('card clicked', function(cardInfo) {
    console.log('Card Clicked: ' + cardInfo);                // We print the statement in the console and
    io.emit('card clicked', [cardInfo[0], cardInfo[1]]); // io.emit sends this message to EVERYONE connected
  });

  socket.on('chat message', function(msg){  // If the socket that is connected sends a 'chat message'
    console.log('message: ' + msg);         // We print the statement in the console and
    console.log('players active: ' + Object.values(clients))
    io.emit('chat message', [clients[socket.id], msg]);           // io.emit sends this message to EVERYONE connected
    io.sockets.connected[lastSocket].emit("secret-message", msg[1]);
    // io.sockets.connected[clients.mheap.socket].emit('private-message',
  });
})
