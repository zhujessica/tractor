class Card {
    // must be enum types
    constructor(rank, suit) {
        // TODO: add in type checking -- make sure to allow jokers (S for small, B for big, listed below) although they are not
        // included in the list of suittypes/ranktypes bc otherwise creating a deck is too hard
        this.rank = rank;
        this.suit = suit;
    }

    get cardValue() {
        return this.rank + ' ' + this.suit;
    }
}

/**
 * Types of card suits.
 * @enum {string}
 */
const SuitType = {
    CLUBS: 'clubs',
    DIAMONDS: 'diamonds',
    HEARTS: 'hearts',
    SPADES: 'spades',
};

/**
 * Joker type. 
 */
const JOKER = 'jokers';

/**
 * Types of card ranks.
 * @enum {string}
 */
const RankType = {
    ACE: 'A',
    TWO: '2',
    THREE: '3',
    FOUR: '4',
    FIVE: '5',
    SIX: '6',
    SEVEN: '7',
    EIGHT: '8',
    NINE: '9',
    TEN: '10',
    JACK: 'J',
    QUEEN: 'Q',
    KING: 'K',
};

/**
 * Ranks for jokers. 
 * @enum {string}
 */
const JokerRanks = {
    BIG: 'B',
    SMALL: 'S',
};

module.exports = Card;
