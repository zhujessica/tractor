/**
 * Types of card suits.
 * @enum {string}
 */
const SuitType = {
    CLUBS: 'clubs',
    DIAMONDS: 'diamonds',
    HEARTS: 'hearts',
    SPADES: 'spades',
    // big and small only
    JOKERS: 'jokers',
};

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
    // for jokers only
    BIG: 'B',
    SMALL: 'S',
};

module.exports = {
    SuitType,
    RankType,
};