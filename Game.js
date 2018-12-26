var Player = require('./Player.js');
var Deck = require('./Deck.js');
var Round = require('./Round.js');

class Game {
    /**
     * 
     * @param {number} id Game ID (for url)
     * @param {number} players The number of players in the game
     */
    constructor(id, players) {
        this.id = id;
        this.players = []; // IDs starting at 1, no banker, no cards, all level 2
        for (var i = 0; i < players; i++) {
            this.players.push(new Player(i+1, false, 2))
        }
        this.banker = 0;
        this.deck = new Deck(2);
        this.deck.shuffle();
        this.levels = []; // levels of every individual person in the game
        for (let i = 0; i < players; i++) {
            this.levels.push(this.players[i].level);
        }
        this.currentCards = []; // list of currently played cards by each player
        this.trumpSuit = "CLUBS"; // default, needs to change
        this.trumpRank = "TWO";
    }

    /**
     * Players take turns drawing cards until the deck is empty
     */
    drawCards() {
        var i = 0;
        while (!this.deck.isEmpty()) {
            this.players[i].drawCard(this.deck.drawCard());
            i = (i+1) % this.players.length;
        }
    }

    /**
     * Finalize the banker for the round. Sets the trump rank.
     * @param {Player} player To be declared banker for the round.
     */
    finalizeBanker(player) {
        player.banker = true;
        this.banker = player.id;
        this.trumpRank = player.level;
    }

    /**
     * Finalizes all of the trumps for the round. Sets each players cards 
     * to be trump accordingly.
     */
    finalizeTrump() {
        for (var player in this.players) {
            player.setTrumpCards(this.trumpSuit, this.trumpRank);
        }
    }

}

module.exports = Game;
