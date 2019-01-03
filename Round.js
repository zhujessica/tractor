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
            points += Round.calculatePoints(hand);
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

    /**
     * @return {boolean} Returns true if cards are all doubles.
     */
    checkIfAllDoubles(cards) {
        var cardSet = new Set(cards);
        return cards.length - cardSet.size == cards.length/2;
    }

    /**
     * 
     * @param {Card} card1 
     * @param {Card} card2 
     * @return {boolean} True if card2 is smaller or the same as card1, false otherwise
     */
    compareTwoHands(card1, card2) {
        if (card1.isTrump && !card2.isTrump) {
            return true;
        } else if (card1.isTrump && card2.isTrump) {
            if (!card1.isTrumpRank && !card2.isTrumpRank) {
                return card1.rank >= card2.rank;
            } else if (card1.isTrumpRank && !card2.isTrumpRank) {
                return card2.suit != SuitType.JOKERS;
            } else if (!card1.isTrumpRank && card2.isTrumpRank) {
                return card1.suit == SuitType.JOKERS;
            } else { // both trump ranks
                return !card2.isTrumpSuit;
            }
        } else if (!card1.isTrump && card2.isTrump) {
            return false;
        } else if (!card1.isTrump && !card2.isTrump) {
            if (card2.suit != card1.suit) {
                return true;
            } else {
                return card1.rank >= card2.rank;
            }
        }
    }
    /**
     * @param {Array<Card>} cards The cards for which to calculate points.
     * @return {number} Return the number of points in the cards.
     */
    static calculatePoints(cards) {
        var points = 0;
        for (var card in cards) {
            points += cards[card].getPoints();
        }
        return points;
    }
};

module.exports = Round;
