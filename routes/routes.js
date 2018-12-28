var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    // Right now I'm just passing in cards as a demo.
    // Ideally, the router would route to some URL # which would pass in the entire game state to each of the clients
    cards: ["5_Spades", "3_Diamonds", "A_Clubs"]
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;

  if (id === '1') {
    var cards = ["A_Spades", "A_Diamonds", "A_Clubs"];
  }
  else if (id === '2') {
    var cards = ["2_Clubs", "2_Diamonds", "2_Hearts"];
  }
  else if (id === '3') {
    var cards = ["3_Spades", "3_Diamonds", "3_Clubs"];
  }
  else {
    var cards = ["4_Spades", "4_Diamonds", "4_Clubs"];
  }

  res.render('index', {
    cards: cards,
    playerNumber: id
  });
});

module.exports = router;
