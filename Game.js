var Player = require('./Player.js');
var Deck = require('./Deck.js');
var Round = require('./Round.js');
const { RankType, SuitType } = require('./CardEnum.js');

class Game {
    /**
     * 
     * @param {Array<Player>} players The players in the game
     */
    constructor(players, trumpRank) {
        this.players = players;
        this.banker = 0;
        for (var p in players) {
            if (players[p].banker == true) {
                if (this.banker == 0) {
                    this.banker = players[p];
                } else {
                    throw new Error("One game can only have one banker");
                }
            }
        }
        this.deck = new Deck(2);
        this.deck.shuffle();
        this.trumpSuit = SuitType.CLUBS; // default, needs to change
        this.trumpRank = RankType.TWO;
        if (this.banker != 0) {
            this.trumpRank = this.banker.level;
        }
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
