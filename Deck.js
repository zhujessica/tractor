var Card = require('./Card.js'); 

class Deck {
    /**
     * 
     * @param {number} numDecks The number of full decks for the game
     */
    constructor(numDecks) {
        this.deck = [];
        for (var suit in Card.SuitType) {
            for (var rank in Card.RankType) {
                for (var j = 0; j < numDecks; j++) {
                    this.deck.push(new Card(rank, suit))
                }
            }
        }
        for (var i = 0; i < numDecks; i++) {
            this.deck.push(new Card(Card.JokerRanks.BIG, Card.JOKER));
            this.deck.push(new Card(Card.JokerRanks.SMALL, Card.JOKER));
        }
    }

    /**
     * Shuffles the deck using Durstenfeld shuffle
     */
    function shuffle() {
        for (var i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]
        }
    }

    function drawCard() {
        return this.deck.pop();
    }

    function isEmpty() {
        return this.deck.length == 0;
    }
}

module.exports = Deck;
