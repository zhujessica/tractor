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
        this.cards = cards;
        this.level = level;
    }
}

