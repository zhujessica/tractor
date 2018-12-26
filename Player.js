const { SuitType, RankType } = require('./CardEnum.js');
var Card = require('./Card.js');

class Player {
    /**
     * 
     * @param {number} id Player ID (IDs of 1 and 3 are a team, 2 and 4 are a team)
     * @param {boolean} banker True if player is banker, False otherwise
     * @param {number} level Overall Player level in the game (everyone starts on 2s
     * and the whole game is won when a Player on level Ace wins the round)
     */
    constructor(id, banker, level) {
        this.id = id;
        this.banker = banker;
        this.cards = {}; // dictionary separating cards into suits
        for (let suit in SuitType) {
            this.cards[suit] = [];
        }
        this.level = level;
    }

    /**
     * Adds a card to the deck
     * @param card {Card} a card to be added to the player's hand
     */
    drawCard(card) {
        this.cards[card.suit].push(card); 
    }

    /**
     * Sorts each suit by number, 2 - 10, J, Q, K, A, Small, Big.
     */
    sortCards() {
        for (var suit in SuitType) {
            this.cards[suit].sort(compareRanks);
        }
    }

    /**
     * @param {Array<Card>} startingPlay A list of cards that were played
     * @param {Array<Card>} play The play to check for validity
     * @return {boolean} True if the play is valid, false otherwise
    */
    isValidPlay(startingPlay, play) {
        var startingSuit = startingPlay[0].suit;

        if (play.length != startingPlay.length) {
            return false;
        } 
        // i think this following rule is covered by the two cases below
        // else if (!startingPlay[0].isTrump && this.cards[startingPlay[0].suit].length == 0) {
        //     // no cards of this suit left and not trump
        //     return true;
        // } 
        else if (startingPlay.length == 1) {
            // one card
            var playedCard = startingPlay[0];
            var currentPlay = play[0]; 
            if (playedCard.isTrump) {
                // played card is trump
                if (this.hasTrump() && currentPlay.isTrump) {
                    return true;
                } else if (!this.hasTrump()) {
                    return true;
                }
            } else if (startingSuit == currentPlay.suit) {
                // suit matches
                return true;
            } else if (this.cards[startingSuit].length == 0) {
                // out of suit
                return true;
            } else {
                return false;
            }
       	} else {
            // tractor of length (play.length / 2)

            if (this.cards[startingSuit].length <= startingPlay.length) {
                // check play has all of the suit + any random cards
            } else {
                // check play is all of the corresponding suit + doubles if applicable
            }
            return false;
        }
    }

    /**
     * Determines if a player's starting play is valid.
     * @param {Array<Card>} play 
     * @return {boolean} True if play is valid, false otherwise
     */
    isValidStartingPlay(play) {
        if (play.length == 1) {
            return true;
        } else if (play.length % 2 == 0) {
            for (var i = 0; i < play.length; i=i+2) {
                // check if they are pairs
                if (play[i] != play[i+1]) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * @param {Card} card A card
     * @param {Card.SuitType} trumpSuit The suit of the trump
     * @param {Card.RankType} trumpRank The rank of the trump
     * @return {boolean} True if the card is trump, false otherwise
     */
    isTrump(card, trumpSuit, trumpRank) {
        if (card.suit == "JOKERS") {
            return true;
        } else if (card.suit == trumpSuit) {
            return true;
        } else if (card.rank == trumpRank) {
            return true;
        }
        return false;
    }

    /**
     * @return {boolean} True if player has trump left, false otherwise
     */
    hasTrump() {
        for (var suit in SuitType) {
            for (var card in this.cards[suit]) {
                if (card.isTrump) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Set the players trump cards.
     */
    setTrumpCards(trumpSuit, trumpRank) {
        for (var suit in SuitType) {
            for (var card in this.cards[suit]) {
                if (isTrump(card, trumpSuit, trumpRank)) {
                    card.isTrump = true;
                }
            }
        }
    }

    /**
     * Plays a card or several cards. Removes them from players current hand.
     * @param {*} card The card(s) to play
     */
    playCard(cards) {
        // remove cards from this.cards
    }
};

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
};

module.exports = Player;
