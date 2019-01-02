var Card = require('../Card.js');
var assert = require('assert');

const { RankType, SuitType } = require('../CardEnum.js');

describe('Card', function() {
    describe('init', function() {
        it('correctly intializes rank and suit', function() {
            var card = new Card(RankType.ACE, SuitType.SPADES);
            assert.strictEqual(card.rank, RankType.ACE);
            assert.strictEqual(card.suit, SuitType.SPADES);
            assert.strictEqual(card.points, 0);
        })
				it('errors on bad rank', function() {
						const cardInit = () => new Card(-1, SuitType.SPADES);
						assert.throws(cardInit, Error); 
				})
				it('errors on bad suit', function() {
				    const cardInit = () => new Card(RankType.ACE, "not a suit");
						assert.throws(cardInit, Error); 
				})
    })
    describe('getCardValue', function() {
        it('correctly gets card value', function() {
            var card = new Card(RankType.ACE, SuitType.SPADES, true);
            assert.strictEqual(card.getCardValue(), '14 spades true');
        })
    })
    describe('getCardPoints', function() {
        it('correctly gets points for 5', function() {
            var card = new Card(RankType.FIVE, SuitType.SPADES);
            assert.strictEqual(card.getPoints(), 5);
        })
        it('correctly gets points for 10', function() {
            var card = new Card(RankType.TEN, SuitType.HEARTS);
            assert.strictEqual(card.getPoints(), 10);
        })
        it('correctly gets points for K', function() {
            var card = new Card(RankType.KING, SuitType.CLUBS);
            assert.strictEqual(card.getPoints(), 10);
        })
        it('correctly gets points for 3', function() {
            var card = new Card(RankType.THREE, SuitType.DIAMONDS);
            assert.strictEqual(card.getPoints(), 0);
        })
    })
})

