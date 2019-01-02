const { SuitType, RankType } = require('./CardEnum.js');
var assert = require('assert');

class Card {
    /**
     * 
     * @param {RankType} rank Any card value from Ace to King, Big and Small (for jokers)
     * @param {SuitType} suit Any card suit from clubs, diamonds, hearts, spades
     */
    constructor(rank, suit) {
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

        this.isTrump = false;
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

    /**
     * Checks if two cards are the same.
     * @return {boolean} true if they are the same, false if not.
     */
    equals(card) {
        return this.rank == card.rank && this.suit == card.suit;
    }
}

module.exports = Card;
