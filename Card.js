const { SuitType, RankType } = require('./CardEnum.js');

class Card {
    /**
     * 
     * @param {RankType} rank Any card value from Ace to King, Big and Small (for jokers)
     * @param {SuitType} suit Any card suit from clubs, diamonds, hearts, spades
     * @param {boolean} isTrump True if card is considered trump, False otherwise 
     * (to be decided after drawing is complete)
     */
    constructor(rank, suit, isTrump) {
        // TODO: add in type checking -- make sure to allow jokers (S for small, B for big, listed below) although they are not
        // included in the list of suittypes/ranktypes bc otherwise creating a deck is too hard
        this.rank = rank;
        this.suit = suit;
        this.isTrump = isTrump;
    }

    getCardValue() {
        return this.rank + ' ' + this.suit + ' ' + this.isTrump;
    }

}

module.exports = Card;
