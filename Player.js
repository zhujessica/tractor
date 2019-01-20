const { SuitType, RankType } = require('./CardEnum.js');
var { compareRanks, hasDoubles, findNumPairs, isNextHighestValue, hasTractorOfLength } = require('./CardHelper.js');
var Card = require('./Card.js');
var Deck = require('./Deck.js');

class Player {
    /**
     * @param {string} username Player username (chosen by user upon entry)
     * @param {number} id Player ID (IDs of 1 and 3 are a team, 2 and 4 are a team)
     * and the whole game is won when a Player on level Ace wins the round)
     */
    constructor(username, id) {
        this.username = username;
        this.id = id;
        this.banker = false; // by default, not banker
        this.vault = []; // only for banker
        this.cards = {}; // dictionary separating cards into suits
        for (let suit in SuitType) {
            this.cards[SuitType[suit]] = [];
        }
        this.level = 2; // default value
        this.trumpRank = 2;
    }

    /**
     * Adds a card to the player's hand.
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
            this.cards[SuitType[suit]].sort(compareRanks);
        }
    }

    /**
     * @param {Card} card The card to be added to the vault.
     */
    addToVault(card) {
        if (!this.hasCard(card)) {
            throw new Error('The player does not have this card');
        }
        this.vault.push(card);
    }

    /**
     * @param {Card} card The card to be removed from the vault.
     */
    removeFromVault(card) {
        for (var c in this.vault) {
            if (this.vault[c].equals(card)) {
                this.vault.splice(c,1);
                break;
            }
        }
    }

    /**
     * Removes the vault cards from the player's hand
     */
    setVault() {
        if (this.banker == false) {
            throw new Error('Only banker has a vault!');
        }
        if (this.vault.length != Deck.VAULT_SIZE) {
            throw new Error('Vault should be ' + Deck.VAULT_SIZE + ' cards');
        }
        for (var c in this.vault) {
            var card = this.vault[c];
            var suit = this.cards[card.suit];
            for (var i in suit) {
                if (suit[i].equals(card)) {
                    suit.splice(i, 1);
                    break;
                }
            }
            this.vault[c] = suit;
        }
    }
    /**
     * Only considers single cards and any number of consecutive doubles to be a 
     * valid starting play. Assumes startingPlay is valid. Assumes play is contained
     * within player's cards. 
     * @param {Array<Card>} startingPlay A list of cards that were played
     * @param {Array<Card>} play The play to check for validity
     * @return {boolean} True if the play is valid, false otherwise
    */
    isValidPlay(startingPlay, play) {
        var playedCard = startingPlay[0];
        var currentPlay = play[0];
        var startingSuit = playedCard.suit;

        if (play.length != startingPlay.length) {
            return false;
        } else if (startingPlay.length == 1) {
            // one card
            if (playedCard.isTrump) {
                // played card is trump
                if (this.hasTrump() && currentPlay.isTrump) {
                    return true;
                } else if (!this.hasTrump()) {
                    return true;
                }
                                                                return false;
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
            const numPairs = startingPlay.length/2;
            // if non-trump tractor
            var playerCardsInSuit = this.cards[startingSuit];
            // if trump tractor
            if (playedCard.isTrump) {
                playerCardsInSuit = this.getTrump();
            }

            if (playerCardsInSuit.length <= startingPlay.length) {
                // check play has all of the suit + any random cards
                for (var i = 0; i < playerCardsInSuit.length; i++) {
                    var card = playerCardsInSuit[i];
                    if (play.indexOf(card) == -1) {
                        return false;
                    }
                }
            } else {
                // check play is all of the corresponding suit + doubles if applicable
                for (var i = 0; i < play.length; i++) {
                    var card = play[i];
                    if (playerCardsInSuit.indexOf(card) == -1) {
                        return false;
                    }
                }
                if (hasDoubles(playerCardsInSuit)) {
                    const numPairsInSuit = findNumPairs(playerCardsInSuit);
                    if (findNumPairs(play) != Math.min(numPairs, numPairsInSuit)) {
                        return false;
                    }
                    
                }
                // check if player has any tractors in hand and play them if necessary
                if (hasTractorOfLength(playerCardsInSuit, numPairs, this.trumpRank) 
                    && !hasTractorOfLength(play, numPairs, this.trumpRank)) {
                    return false;
                }
            }
            return true;
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
            for (var i = 0; i < play.length; i+=2) {
                // check if they are pairs
                if (play[i] != play[i+1]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * if not trump suit, if card2 is next
     * if trump suit, if card2 is next
     * @param {Card} card1
     * @param {Card} card2 
     * @return {boolean} True if card2 is the next highest value card after card1, false otherwise
     */
    isNextHighestValue(card1, card2) {
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

    /**
     * @param {Array<Card>} cards to look for doubles in
     * @return {boolean} True if cards has doubles, false otherwise
     */
    hasDoubles(cards) {
        const card_set = new Set(cards);
        return card_set.length != cards.length;
    }

    /**
     * @param {Array<Card>} cards
     * @returns {number} Number of pairs found in cards. 0 if none. 
     */
    findNumPairs(cards) {
        const card_set = new Set(cards);
        return card_set.length - card_set.length;
    }

    /**
     * @param {Card} card The card to check for in the player's hand.
     * @return {boolean} true if the player has the card, false otherwise.
     */
    hasCard(card) {
        var suit = this.cards[card.suit];
        for (var c in suit) {
            if (suit[c].equals(card)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {Card} card A card
     * @param {Card.SuitType} trumpSuit The suit of the trump
     * @param {Card.RankType} trumpRank The rank of the trump
     * @return {boolean} True if the card is trump, false otherwise
     */
    isTrump(card, trumpSuit, trumpRank) {
        if (card.suit == SuitType.JOKERS) {
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
        for (var suit of Object.values(SuitType)) {
            for (var i = 0; i < this.cards[suit].length; i++) {
                if (this.cards[suit][i].isTrump) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @return {number} Return number of trump in player's hand.
     */
    numTrump() {
        // TODO: implement this
        return 0;
    }

    /**
     * @return {Array<Card>} array of trump cards in player's hand.
     */
    getTrump() {
        // TODO: implement this
        var trumps = [];
        for (let suit in SuitType) {
            var cardsInSuit = this.cards[SuitType[suit]];
            for (var i = 0; i < cardsInSuit.length; i++) {
                if (cardsInSuit[i].isTrump) {
                    trumps.push(cardsInSuit[i]);
                }
            }
        }
        return trumps;
    }

    /**
     * Set the players trump cards.
     */
    setTrumpCards(trumpSuit, trumpRank) {
        var num_trump = 0;
        for (var suit of Object.values(SuitType)) {
            for (var i = 0; i < this.cards[suit].length; i++) {
                if (this.isTrump(this.cards[suit][i], trumpSuit, trumpRank)) {
                    num_trump += 1;
                    this.cards[suit][i].isTrump = true;
                }
            }
        }
        return num_trump;
    }

    /**
     * Plays a card or several cards. Removes them from players current hand.
     * @param {*} card The card(s) to play
     */
    playCard(cards) {
        // remove cards from this.cards
    }
};

module.exports = Player;
