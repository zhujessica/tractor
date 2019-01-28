const { RankType, SuitType } = require('./CardEnum.js');

/**
 * File is a bunch of helper methods for comparing and validating hands.
 */

/**
 * @param {Array<Card>} cards
 * @returns {number} Number of pairs found in cards. 0 if none. 
 */
function findNumPairs(cards) {
    var card_set = new Set();
    for (var i = 0; i < cards.length; i++) {
        card_set.add(cards[i]);
    }
    return cards.length - card_set.size;
}

/**
 * @param {Array<Card>} cards to look for doubles in
 * @return {boolean} True if cards has doubles, false otherwise
 */
function hasDoubles(cards) {
    return findNumPairs(cards) != 0;
}

/**
 * @return {boolean} Returns true if cards are all doubles.
 */
function checkIfAllDoubles(cards) {
    return findNumPairs(cards) == cards.length/2;
}

/**
 * 
 * @param {Array<Card>} cards 
 * @return {Array<Card>} list of cards, each card representing a double.
 */
function getDoubles(cards) {
    var doubles = [];
    var seen = [];
    for (var i = 0; i < cards.length; i++) {
        if (seen.indexOf(cards[i]) != -1) {
            doubles.push(cards[i]);
        } else {
            seen.push(cards[i]);
        }
    }
    return doubles;
}

/**
 * 
 * @param {Card} card1 
 * @param {Card} card2 
 * @return {boolean} True if card2 is smaller or the same as card1, false otherwise
 */
function compareTwoCards(card1, card2) {
    if (card1.isTrump && !card2.isTrump) {
        return true;
    } else if (card1.isTrump && card2.isTrump) {
        if (!card1.isTrumpRank && !card2.isTrumpRank) {
            return card1.rank > card2.rank;
        } else if (card1.isTrumpRank && !card2.isTrumpRank) {
            return card2.suit != SuitType.JOKERS;
        } else if (!card1.isTrumpRank && card2.isTrumpRank) {
            return card1.suit == SuitType.JOKERS;
        } else { // both trump ranks
            return false;
        }
    } else if (!card1.isTrump && card2.isTrump) {
        return false;
    } else if (!card1.isTrump && !card2.isTrump) {
        if (card2.suit != card1.suit) {
            return true;
        } else {
            return card1.rank > card2.rank;
        }
    }
}

/**
 * if not trump suit, if card2 is next
 * if trump suit, if card2 is next
 * @param {Card} card1
 * @param {Card} card2 
 * @return {boolean} True if card2 is the next highest value card after card1, false otherwise
 */
function isNextHighestValue(card1, card2, trumpRank) {
    if (!card1.isTrump) {
        if (card2.suit != card1.suit) {
            return false;
        } else if (card1.rank == RankType.ACE && card2.rank == RankType.TWO) {
            return true;
        } else if (card1.rank + 1 == card2.rank) {
            return true;
        } else if (card1.rank + 1 == trumpRank && card1.rank + 2 == card2.rank) {
            return true;
        } else {
            return false;
        }
    } else {
        if (!card1.isTrumpRank && !card2.isTrumpRank) {
            if (card1.rank + 1 == card2.rank) {
                return true;
            } else if (card1.rank + 1 == trumpRank && card1.rank + 2 == card2.rank) {
                return true;
            }
        } else if (!card1.isTrumpRank && card2.isTrumpRank) {
            if (trumpRank == RankType.ACE) {
                if (card1.rank == RankType.KING && !card2.isTrumpSuit) {
                    return true;
                }
            } else {
                if (card1.rank == RankType.ACE && !card2.isTrumpSuit) {
                    return true;
                }
            }
        } else if (card1.isTrumpRank && card2.isTrumpRank) {
            if (!card1.isTrumpSuit && card2.isTrumpSuit) {
                return true;
            }
        } else {
            if (card1.isTrumpSuit && card2.rank == RankType.SMALL) {
                return true;
            }
        }
        return false;
    }
}

/**
 * 
 * @param {Array<Card>} cards Either all one suit (non trump), or all trump.
 * @param {number} lenTractor 
 * @return {boolean} true if cards has a tractor of length lenTractor
 */
function hasTractorOfLength(cards, lenTractor, trumpRank) {
    var doubles = getDoubles(cards);
    if (doubles.length < lenTractor) {
        return false;
    }
    doubles.sort(compareRanks);
    var count = 1;
    var maxCount = 1;
    for (var i = 0; i < doubles.length - 1; i++) {
        if (isNextHighestValue(doubles[i], doubles[i+1], trumpRank)) {
            count += 1;
            maxCount = Math.max(count, maxCount);
        } else {
            count = 1;
        }
    }
    return maxCount >= lenTractor;
}

/**
 * Compares the ranks of two cards, regardless of suit. Used for sorting hands.
 * @param {Card} card1 
 * @param {Card} card2 
 * @param {boolean} isTrump whether or not the cards are trumps
 * @return {number} Returns 1 if card1 < card2, -1 otherwise.
 */
function compareRanks(card1, card2) {
    if (!card1.isTrump) {
        if (card1.rank < card2.rank) {
            return -1;
        }
        return 1;
    } else {
        if (!card1.isTrumpRank && !card2.isTrumpRank) {
            if (card1.rank < card2.rank) {
                return -1;
            }
        } else if (!card1.isTrumpRank && card2.isTrumpRank) {
            if (card1.suit != SuitType.JOKERS) {
                return -1;
            }
        } else if (card1.isTrumpRank && !card2.isTrumpRank) {
            if (card2.suit == SuitType.JOKERS) {
                return -1;
            }
        } else if (card1.isTrumpRank && card2.isTrumpRank) {
            if (!card1.isTrumpSuit && card2.isTrumpSuit) {
                return -1;
            }
        } 
        return 1;
    }
}

module.exports = {
    checkIfAllDoubles,
    compareTwoCards,
    compareRanks,
    hasDoubles,
    getDoubles,
    findNumPairs,
    isNextHighestValue,
    hasTractorOfLength
}
