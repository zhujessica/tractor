/**
 * Types of card suits.
 * @enum {string}
 */
const SuitType = {
    CLUBS: 'clubs',
    DIAMONDS: 'diamonds',
    HEARTS: 'hearts',
    SPADES: 'spades',
    JOKERS: 'jokers', // big and small only
};

// *
// * Types of card ranks.
// * @enum {string}
// */
// const RankType = {
//     ACE: 'A',
//     TWO: '2',
//     THREE: '3',
//     FOUR: '4',
//     FIVE: '5',
//     SIX: '6',
//     SEVEN: '7',
//     EIGHT: '8',
//     NINE: '9',
//     TEN: '10',
//     JACK: 'J',
//     QUEEN: 'Q',
//     KING: 'K',
//     BIG: 'B', // only for jokers
//     SMALL: 'S', // only for jokers
// };

/**
* Types of card ranks.
* @enum {number}
*/
const RankType = {
    ACE: 14,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    BIG: 51, // only for jokers
    SMALL: 50, // only for jokers
};


module.exports = {
    SuitType,
    RankType,
};