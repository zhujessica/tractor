var Player = require('../Player.js');
var Card = require('../Card.js');
var assert = require('chai').assert;

describe('Player', function() {
	describe('isTrump()', function() {
		it('should be true only if suit or rank is trump', function() {
		  var card = new Card('A', 'spades');
		  var player = new Player(1, false, [card], 2);

		  assert.strictEqual(player.isTrump(card, 'hearts', '2'), false);
		  assert.strictEqual(player.isTrump(card, 'spades', '2'), true);
		  assert.strictEqual(player.isTrump(card, 'hearts', 'A'), true);
		  assert.strictEqual(player.isTrump(card, 'spades', 'A'), true);
		})
	})
})

