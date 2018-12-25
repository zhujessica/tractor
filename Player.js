var Card = require('./Card.js');

class Player {
    /**
     * 
     * @param {number} id Player ID (IDs of 1 and 3 are a team, 2 and 4 are a team)
     * @param {boolean} banker True if player is banker, False otherwise
     * @param {Array<Card>} cards Sorted (by suit, and then by number) list of cards 
     * currently held by this Player
     * @param {number} level Overall Player level in the game (everyone starts on 2s
     * and the whole game is won when a Player on level Ace wins the round)
     */
    constructor(id, banker, cards, level) {
        this.id = id;
        this.banker = banker;
        // this.cards = cards;
        this.cards = {};
        for (var suit in Card.SuitType) {
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
     * Sorts each suit by number
     */
    sortCards() {
        for (var suit in Card.SuitType) {
            // is there a way to specify a comaprator lol
        }
    }

    /**
     * @param {Array<Card>} startingPlay A list of cards that were played
     * @param {Array<Card>} play The play to check for validity
     * @param {Card.SuitType} trumpSuit The suit of the trump
     * @param {Card.RankType} trumpRank The rank of the trump
     * @return {boolean} True if the play is valid, false otherwise
    */
    isValidPlay(startingPlay, play, trumpSuit, trumpRank) {
        var validCards = new Set();

        if (play.length != startingPlay.length) {
            return False;
        } else if (this.cards[startingPlay[0].suit].length == 0) {
            // no cards of this suit left
            return true;
        } else if (startingPlay.length == 1) {
            // one card
            var playedCard = staringPlay[0];
            var currentPlay = play[0]; 
            if (isTrump(playedCard)) {
                // played card is trump
                if (hasTrump(this.cards, trumpSuit, trumpRank) && isTrump(currentPlay)) {
                    return true;
                } else if (!hasTrump(this.cards, trumpSuit, trumpRank)) {
                    return true;
                }
            } else if (playedCard.suit == currentPlay.suit) {
                // suit matches
                return true;
            } else if (this.cards[playedCard.suit].length == 0) {
                // out of suit
                return true;
            } else {
                return false;
            }
        } else {
            // tractor of length (play.length / 2)
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
        if (card.suit == Card.JOKER) {
            return true;
        } else if (card.suit == trumpSuit) {
            return true;
        } else if (card.rank == trumpRank) {
            return true;
        }
        return false;
    }
}

module.exports = Player;
