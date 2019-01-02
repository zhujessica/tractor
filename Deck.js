const { SuitType, RankType } = require('./CardEnum.js');
var Card = require('./Card.js'); 

const VAULT_SIZE = 8;
class Deck {
    static get VAULT_SIZE() { return VAULT_SIZE; }
    /**
     * 
     * @param {number} numDecks The number of full decks for the game
     */
    constructor(numDecks) {
        this.deck = [];
        for (var suit in SuitType) {
            for (var rank in RankType) {
                // add all cards matching either numbers + suits or big and small jokers
                if ((suit == "JOKERS" && (rank == "BIG" || rank == "SMALL") || 
                (suit !== "JOKERS" && rank !== "BIG" && rank !== "SMALL"))) {
                    for (let j = 0; j < numDecks; j++) {
                        this.deck.push(new Card(RankType[rank], SuitType[suit], false))
                    }
                }
                
            }
        }
        // console.log(this.deck);
    }

    /**
     * Shuffles the deck using Durstenfeld shuffle
     */
    shuffle() {
        for (var i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]
        }
    }

    drawCard() {
        return this.deck.pop();
    }

    /**
     * @return {boolean} returns true if there are no cards left to draw based on vault size, and false otherwise
     */
    isEmpty() {
        return this.deck.length == VAULT_SIZE;
    }

    getVault() {
        if (this.deck.length != VAULT_SIZE) {
            throw new Error('Not done drawing!');
        }
        return this.deck;
    }
};

module.exports = Deck;
