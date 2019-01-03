var { checkIfAllDoubles, compareTwoHands, hasTractorOfLength } = require('./CardHelper.js');
var Card = require('./Card.js');
var Player = require('./Player.js');

class Round {
    /**
     * 
     * @param {Array<Player>} players A list of all players in the game, in the order
     * that they played their cards. Player 0 is the starting player.
     * @param {Map<Player, Array<Card>>} playedCards A map of players to the cards they played.
     */
    constructor(players, playedCards) {
        this.players = players;
        this.startingPlayer = this.players[0];
        this.playedCards = playedCards;
        this.totalPoints = 0; // total points in the round
    }

    // /**
    //  * @param {Player} player The player putting down the cards.
    //  * @param {Array<Card>} cards A list of the cards the player is playing.
    //  */
    // playCards(player, cards) {
    //     this.playedCards[player.id] = cards;
    //     this.totalPoints += this.calculatePoints(cards);
    // }

    /**
     * @return {number} Return total number of points in the round.
     */
    calculateTotalPoints() {
        var points = 0;
        for (var hand in this.playedCards) {
            points += this.calculatePoints(hand);
        }
        return points;
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
     * Assumes cards are sorted so trump is at the end.
     * @return {Player} Return winning player.
     */
    determineRoundHighest() {
        // return player with highest value of cards
        // in the case of a tie, return player who played first
        var startingHand = this.playedCards[this.startingPlayer.id];
        var highestPlayer = this.players[0];
        var highestHand = this.playedCards[highestPlayer.id];
        for (var i = 1; i < this.players.length; i++) {
            var player = this.players[i];
            var hand = this.playedCards[player.id];
            if (startingHand.length == 1) {
                if (!compareTwoHands(highestHand[0], hand[0])) {
                    highestPlayer = player;
                    highestHand = this.playedCards[player.id];
                }
            } else {
                if (checkIfAllDoubles(hand)) {
                    // TODO: add in tractor checking
                    if (hasTractorOfLength(hand, startingHand.length/2)) {
                        if (!compareTwoHands(highestHand[0], hand[0])) {
                            highestPlayer = player;
                            highestHand = this.playedCards[player.id];
                        }
                    }
                }
            }
            
        }
        return highestPlayer;
    }
}

module.exports = Round;