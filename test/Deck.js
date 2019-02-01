const { RankType, SuitType } = require('../CardEnum.js');
var Card = require('../Card.js');
var Deck = require('../Deck.js');
var assert = require('chai').assert;

describe('Deck', function() {
    describe('init', function() {
        it('correctly initializes number of decks of cards in order', function() {
            var deck = new Deck(1);
            assert.strictEqual(deck.deck.length, 54);
            var firstCard = new Card(RankType.ACE, SuitType.CLUBS, false);
            var secondCard = new Card(RankType.TWO, SuitType.CLUBS, false);
            var lastCard = new Card(RankType.SMALL, SuitType.JOKERS, false);
            assert.deepEqual(deck.deck[0], firstCard);
            assert.deepEqual(deck.deck[1], secondCard);
            assert.deepEqual(deck.deck[53], lastCard);

            var deck = new Deck(2);
            assert.strictEqual(deck.deck.length, 108);

            var deck2 = new Deck(2);
            assert.deepEqual(deck, deck2);
        })
    })
    
    describe('shuffle', function() {
        it('shuffles deck', function() {    
            var deck = new Deck(2);
            var unshuffled = new Deck(2);
            deck.shuffle();
            assert.notDeepEqual(deck, unshuffled);
        })
    })

    describe('drawCard', function() {
        it('draws card and removes it', function() {
            var deck = new Deck(2);
            var card = deck.drawCard();
            assert.strictEqual(deck.deck.length, 107);
        })
    })

    describe('isEmpty', function() {
        it('is not empty when more cards left than vault', function() {
            var deck = new Deck(2);
            assert.strictEqual(deck.isEmpty(), false);
        })
        it('is empty when only vault cards left', function() {
            var deck = new Deck(2);
            var length = deck.deck.length - Deck.VAULT_SIZE;
            for (var i = 0; i < length; i++){
                deck.drawCard();
            }
            assert.strictEqual(deck.isEmpty(), true);
        })
    })
    
    describe('getVault', function() {
        it('throws error if deck not vault size', function() {
            var deck = new Deck(2);
            assert.throws(deck.getVault, Error); 
        })
        it('returns deck if correct size', function() {
            var deck = new Deck(2);
            var length = deck.deck.length - Deck.VAULT_SIZE;
            for (var i = 0; i < length; i++) {
                deck.drawCard();
            }
            assert.deepEqual(deck.getVault(), deck.deck);
        })
    })
})
