const { SuitType, RankType } = require('./CardEnum.js');
var assert = require('assert');

class Card {
    /**
     * 
     * @param {RankType} rank Any card value from Ace to King, Big and Small (for jokers)
     * @param {SuitType} suit Any card suit from clubs, diamonds, hearts, spades
     * @param {boolean} isTrump True if card is considered trump, False otherwise 
     * (to be decided after drawing is complete)
     */
    constructor(rank, suit, isTrump) {
				// Validate rank
				// https://stackoverflow.com/questions/35948669/how-to-check-if-value-exists-in-object-using-javascript
				var validRank = Object.keys(RankType).some(
						function(k) {
								return RankType[k] == rank;
						}
				);
				if (!validRank) {
						throw new Error("invalid rank given to Card\n");
				}
        this.rank = rank;
				
				// Validate suit
				var validSuit = Object.keys(SuitType).some(
						function(k) {
								return SuitType[k] == suit;
						}
				);
				if (!validSuit) {
						throw new Error("invalid suit given to Card\n");
				}
        this.suit = suit;

        this.isTrump = isTrump;
        this.isTrumpSuit = false;
        this.isTrumpRank = false;
        this.points = 0;
        if (this.rank == RankType.FIVE) {
            this.points = 5;
        } else if (this.rank == RankType.TEN || this.rank == RankType.KING) {
            this.points = 10; 
        }
    }

    getCardValue() {
        return this.rank + ' ' + this.suit + ' ' + this.isTrump;
    }

    getPoints() {
        return this.points;
    }
}

module.exports = Card;
