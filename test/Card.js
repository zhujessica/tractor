var Card = require('../Card.js');
var assert = require('chai').assert;

describe('Card', function() {
	describe('init', function() {
		it('correctly intializes rank and suit', function() {
			var card = new Card('A', 'spades');
			assert.strictEqual(card.rank, 'A');
			assert.strictEqual(card.suit, 'spades');
		})
	})
	describe('getCardValue', function() {
		it('correctly gets card value', function() {
			var card = new Card('A', 'spades');
			assert.strictEqual(card.getCardValue(), 'A spades');
		})
	})
})

