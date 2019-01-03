const { RankType, SuitType } = require('./CardEnum.js');

/**
 * File is a bunch of helper methods for comparing and validating hands.
 */

/**
 * @return {boolean} Returns true if cards are all doubles.
 */
function checkIfAllDoubles(cards) {
    var cardSet = new Set(cards);
    return cards.length - cardSet.size == cards.length/2;
}

/**
 * 
 * @param {Card} card1 
 * @param {Card} card2 
 * @return {boolean} True if card2 is smaller or the same as card1, false otherwise
 */
function compareTwoHands(card1, card2) {
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
 * Compares the ranks of two cards, regardless of suit. 
 * @param {Card} card1 
 * @param {Card} card2 
 * @return {number} Returns 1 if card1 < card2, -1 otherwise.
 */
function compareRanks(card1, card2) {
    rankOrdering = {
        "TWO": 1,
        "THREE": 2,
        "FOUR": 3,
        "FIVE": 4,
        "SIX": 5,
        "SEVEN": 6,
        "EIGHT": 7,
        "NINE": 8,
        "TEN": 9,
        "JACK": 10,
        "QUEEN": 11,
        "KING": 12,
        "ACE": 13,
        "SMALL": 14,
        "BIG": 15
    };
    if (rankOrdering[card1.rank] < rankOrdering[card2.rank]) {
        return -1;
    }
    return 1;
}

/**
 * @param {Array<Card>} cards to look for doubles in
 * @return {boolean} True if cards has doubles, false otherwise
 */
function hasDoubles(cards) {
    const card_set = new Set(cards);
    return card_set.length != cards.length;
}

/**
 * @param {Array<Card>} cards
 * @returns {number} Number of pairs found in cards. 0 if none. 
 */
function findNumPairs(cards) {
    const card_set = new Set(cards);
    return card_set.length - card_set.length;
}


/**
 * if not trump suit, if card2 is next
 * if trump suit, if card2 is next
 * @param {Card} card1
 * @param {Card} card2 
 * @return {boolean} True if card2 is the next highest value card after card1, false otherwise
 */
function isNextHighestValue(card1, card2) {
    if (!card1.isTrump) {
        if (card2.suit != card1.suit) {
            return false;
        } else if (card1.rank == RankType.ACE && card2.rank == RankType.TWO) {
            return true;
        } else if (card1.rank + 1 == card2.rank) {
            return true;
        }
    } else {

    }
}

module.exports = {
    checkIfAllDoubles,
    compareTwoHands,
    compareRanks,
    hasDoubles,
    findNumPairs,
    isNextHighestValue
}