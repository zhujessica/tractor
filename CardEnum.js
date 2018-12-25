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
const JOKER = 'joker';

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
const JokerRank = {
    BIG: 'B',
    SMALL: 'S',
};

module.exports = {
    SuitType,
    JOKER,
    RankType,
    JokerRank,
};