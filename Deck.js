const { SuitType, JOKER, RankType, JokerRank } = require('./CardEnum.js');
var Card = require('./Card.js'); 

class Deck {
    /**
     * 
     * @param {number} numDecks The number of full decks for the game
     */
    constructor(numDecks) {
        this.deck = [];
        for (var suit in SuitType) {
            for (var rank in RankType) {
                for (let j = 0; j < numDecks; j++) {
                    this.deck.push(new Card(rank, suit, false))
                }
            }
        }
        for (let i = 0; i < numDecks; i++) {
            this.deck.push(new Card(JokerRank.BIG, JOKER, true));
            this.deck.push(new Card(JokerRank.SMALL, JOKER, true));
        }
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

    isEmpty() {
        return this.deck.length == 0;
    }
};

module.exports = Deck;
