var Card = require('../Card.js');
const { RankType, SuitType } = require('../CardEnum.js');
// var assert = require('chai').assert;
var assert = require('assert');

describe('Card', function() {
    describe('init', function() {
        it('correctly intializes rank and suit', function() {
            var card = new Card('A', 'spades');
            assert.strictEqual(card.rank, 'A');
            assert.strictEqual(card.suit, 'spades');
            assert.strictEqual(card.points, 0);
        })
    })
    describe('getCardValue', function() {
        it('correctly gets card value', function() {
            var card = new Card('A', 'spades', true);
            assert.strictEqual(card.getCardValue(), 'A spades true');
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

