var Card = require('./Card.js');
var Player = require('./Player.js');

class Round {
    /**
     * 
     * @param {Array<Player>} players A list of all players in the game.
     * @param {Player} startingPlayer The player starting the round.
     * @param {Array<Card>} playedCards A list of cards played by the players.
     */
    constructor(players, startingPlayer, playedCards) {
        this.players = players;
        this.startingPlayer = startingPlayer;
        this.playedCards = playedCards;
        this.totalPoints = 0; // total points in the round
    }

    /**
     * @return {number} Return total number of points in the round.
     */
    calculateTotalPoints() {
        // count 5s, 10s, Ks in playedCards
        return 0;
    }

    /**
     * @return {Player} Return winning player.
     */
    determineRoundHighest() {
        // return player with highest value of cards
        // in the case of a tie, return player who played first
        return this.players[0];
    }
}

module.exports = Round;