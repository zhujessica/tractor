var Player = require('./Player.js');
var Deck = require('./Deck.js');

class Game {
    /**
     * 
     * @param {number} id Game ID (for url)
     * @param {number} players The number of players in the game
     */
    constructor(id, players) {
        this.id = id;
        this.players = [];
        this.banker = 0;
        this.deck = new Deck(players / 2);
        this.deck.shuffle();
        this.levels = [2, 2];
        this.currentCards = []; 
    }

    /**
     * @param {Player} player The player being added
     */
    function addPlayer(player) {
        this.players.push(player);
    }

    /**
     * Players take turns drawing cards until the deck is empty
     */
    function drawCards() {
        var i = 0;
        while !this.deck.isEmpty() {
            players[i].drawCard(this.deck.drawCard);
            i = i % players.length + 1;
        }
    }
}

module.exports = Game;
