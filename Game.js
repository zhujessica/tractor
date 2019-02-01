var Player = require('./Player.js');
var Deck = require('./Deck.js');
var Round = require('./Round.js');
const { RankType, SuitType } = require('./CardEnum.js');

class Game {
    /**
     * 
     * @param {Array<Player>} players The players in the game
     */
    constructor(players) {
        this.players = players;
        this.banker = 0;
        this.points = 0;
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
     * Deals one card from the deck to the player. Server calls this method.
     * Throws error if no cards left to deal.
     */
    dealCard(player) {
        if (this.deck.isEmpty()) {
            throw new Error('no more cards to deal!');
        } else {
            console.log(player);
            console.log(this.deck.drawCard());
            player.drawCard(this.deck.drawCard());
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
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].trumpRank = this.trumpRank;
        }
    }

    /**
     * Finalizes all of the trumps for the round. Sets each players cards 
     * to be trump accordingly.
     */
    finalizeTrump() {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].setTrumpCards(this.trumpSuit, this.trumpRank);
        }
    }

    /**
     * To be used when determining tractors.
     * @param {Card} card1
     * @param {Card} card2 
     * @return {boolean} True if card2 is the next highest value card after card1, false otherwise
     */
    isNextHighestValue(card1, card2) {
        if (card1.isTrump != card2.isTrump) {
            return false;
        }
        if (!card1.isTrump) {
            if (card2.suit != card1.suit) {
                return false;
            } else if (card1.rank == RankType.ACE && card2.rank == RankType.TWO) {
                return true;
            } else if (card1.rank + 1 == card2.rank) {
                return true;
            } else if (card1.rank + 1 == this.trumpRank && card1.rank + 2 == card2.rank) {
                return true;
            }
        } else {
            if (card1.rank != this.trumpRank && card2.rank != this.trumpRank) {
                if (card1.rank + 1 == card2.rank) {
                    return true;
                } else if (card1.rank + 1 == this.trumpRank && card1.rank + 2 == card2.rank) {
                    return true;
                }
            } else if (card1.rank != this.trumpRank && card2.rank == this.trumpRank) {
                if (this.trumpRank != RankType.ACE) {
                    if (card1.rank == RankType.ACE && card2.suit != this.trumpSuit) {
                        return true;
                    }
                } else {
                    if (card1.rank == RankType.KING && card2.suit != this.trumpSuit) {
                        return true;
                    }
                }
            } else if (card1.rank == this.trumpRank && card2.rank == this.trumpRank) {
                if (card1.suit != this.trumpSuit && card2.suit == this.trumpSuit) {
                    return true;
                }
            } else if (card1.rank == this.trumpRank && card2.rank == RankType.SMALL) {
                if (card1.suit == this.trumpSuit) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @param {number} points The number of points to add to the current game.
     */
    updatePoints(points) {
        this.points += points;
    }

    /**
     * @param {Player} lastRoundWinner The winning player of the last round.
     * @param {number} numCards The number of cards in the last round.
     * @return {number} points The number of points won in the game, including vault.
     */
    getTotalPoints(lastRoundWinner, numCards) {
        if (lastRoundWinner.id % 2 == this.banker.id % 2) {
            return this.points;
        }
        var vaultPoints = Round.calculatePoints(this.banker.vault);
        return this.points + vaultPoints * Math.pow(2, numCards);
    }
}

module.exports = Game;
