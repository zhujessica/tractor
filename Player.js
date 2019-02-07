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
    constructor(id, username) {
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
                } else {
                    return false;
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
    isValidStartingPlay(play, trumpSuit, trumpRank) {
        if (play.length == 1) {
            return true;
        } else if (play.length == 2) {
            return play[0].suit == play[1].suit && play[0].rank == play[1].rank;
        } else if (play.length % 2 == 0) {
            var tractorSuit = play[0].suit;
            var trumpTractor = this.isTrump(play[0], trumpSuit, trumpRank);
            
            // Ensure that all cards are the same suit or are trump
            for (var i = 0; i < play.length; i++) {
                if (trumpTractor) {
                    if (!this.isTrump(play[i], trumpSuit, trumpRank)) {
                        return false;
                    }
                } else {
                    if (play[i].suit != tractorSuit) {
                        return false;
                    }
                }
            }
            if (hasTractorOfLength(play, play.length/2, trumpRank) == false) {
                return false;
            } else {
                return true;
            }
        }
        return false;
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
        var numTrump = 0;
        for (var suit of Object.values(SuitType)) {
            for (var i = 0; i < this.cards[suit].length; i++) {
                if (this.cards[suit][i].isTrump) {
                    numTrump += 1;
                }
            }
        }
        return numTrump;
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
        for (var suit of Object.values(SuitType)) {
            for (var i = 0; i < this.cards[suit].length; i++) {
                if (this.isTrump(this.cards[suit][i], trumpSuit, trumpRank)) {
                    this.cards[suit][i].isTrump = true;
                    if (this.cards[suit][i].rank == trumpRank) {
                        this.cards[suit][i].isTrumpRank = true;
                    }
                    if (this.cards[suit][i].suit == trumpSuit) {
                        this.cards[suit][i].isTrumpSuit = true;
                    }
                }
            }
        }
    }

    /**
     * Removes a single card from the players current hand if the card exists.
     * Otherwise, throws an error.
     * @param{Card} the card to remove.
     */
    removeCard(card) {
        var suit = this.cards[card.suit];
        var indexToRemove = -1;
        for (var index in suit) {
            if (suit[index].equals(card)) {
                indexToRemove = index;
                break;
            }
        }
        if (indexToRemove > -1) {
            this.cards[card.suit].splice(index, 1);
        } else {
            throw new Error('player trying to remove card that doesn\'t exist');
        }
    }

    /**
     * Plays a card or several cards. Removes them from players current hand.
     * @param {Array<Card>} the card(s) to play.
     */
    playCards(cards) {
        // remove cards from this.cards
        for (var i = 0; i < cards.length; i++) {
            if (!this.hasCard(cards[i])){
                throw new Error('player trying to play card they don\'t have');
            }
            this.removeCard(cards[i]);   
        }
    }
};

module.exports = Player;
