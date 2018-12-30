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
        // this.playedCards = playedCards;
        this.playedCards = {};
        this.totalPoints = 0; // total points in the round
    }

    /**
     * @param {Player} player The player putting down the cards.
     * @param {Array<Card>} cards A list of the cards the player is playing.
     */
    playCards(player, cards) {
        this.playedCards[player.id] = cards;
        this.totalPoints += this.calculatePoints(cards); 
    }

    /**
     * @return {number} Return total number of points in the round.
     */
    calculateTotalPoints() {
        return this.totalPoints;
    }

    /**
     * @param {Array<Card>} cards The cards for which to calculate points.
     * @return {number} Return the number of points in the cards.
     */
    calculatePoints(cards) {
        var points = 0;
        for (var card in cards) {
            points += cards[card].getPoints();
        }
        return points;
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