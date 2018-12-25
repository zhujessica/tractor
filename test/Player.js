var Player = require('../Player.js');
var Card = require('../Card.js');
var assert = require('chai').assert;

describe('Player', function() {
	describe('drawCard', function() {
		it('adds new card to hand', function() {	
			var card = new Card('A', 'spades');
			var card2 = new Card('J', 'hearts');
			var card3 = new Card('2', 'diamonds');
			
			var player = new Player(1, false, [], '2');
			
			player.drawCard(card);
			assert.deepEqual(player.cards['spades'], [card]);
			player.drawCard(card2);
			assert.deepEqual(player.cards['hearts'], [card2]);
			player.drawCard(card3);
			assert.deepEqual(player.cards['diamonds'], [card3]);
		})
	})

	describe('isValidPlay', function() {
		it('single card left, first to play', function() {
			var card = new Card('A', 'spades');
			player = new Player(1, false, [card], '2');
			assert.strictEqual(player.isValidPlay([card], [card], 'diamonds', '3'), true); 
		})
		it('single card left, not first to play', function() {
			var card = new Card('A', 'spades');
			var card2 = new Card('5', 'hearts');
			player = new Player(1, false, [card2], '2');
			
			assert.strictEqual(player.isValidPlay([card], [card2], 'diamonds', '3'), true);

			var card2 = new Card('5', 'spades');
			player = new Player(1, false, [card2], '2');
			assert.strictEqual(player.isValidPlay([card], [card2], 'diamonds', '3'), true);

			var card2 = new Card('3', 'hearts');
			player = new Player(1, false, [card2], '2');
			assert.strictEqual(player.isValidPlay([card], [card2], 'diamonds', '3'), true);

			var card2 = new Card('5', 'diamonds');
			player = new Player(1, false, [card2], '2');
			assert.strictEqual(player.isValidPlay([card], [card2], 'diamonds', '3'), true); 
		})
		it('multiple cards left, first to play', function() {
			var card = new Card('A', 'spades');
			var card2 = new Card('J', 'hearts');
			player = new Player(1, false, [card, card2], '2');
			assert.strictEqual(player.isValidPlay([card], [card], 'diamonds', '3'), true); 
		})
		it('multiple cards left, not first to play', function() {
			var card = new Card('A', 'spades');
			
			// no card of suit
			var card2 = new Card('5', 'hearts');
			var card3 = new Card('7', 'diamonds');
			player = new Player(1, false, [card2, card3], '2');
			assert.strictEqual(player.isValidPlay([card], [card2], 'diamonds', '3'), true);

			// card of suit but not played
			var card2 = new Card('5', 'hearts');
			var card3 = new Card('7', 'spades');
			player = new Player(1, false, [card2, card3], '2');
			assert.strictEqual(player.isValidPlay([card], [card2], 'diamonds', '3'), false);

			// card of suit and played
			var card2 = new Card('5', 'hearts');
			var card3 = new Card('7', 'spades');
			player = new Player(1, false, [card2, card3], '2');
			assert.strictEqual(player.isValidPlay([card], [card3], 'diamonds', '3'), true);
		})
	})

	describe('isTrump()', function() {
		it('suit is trump suit', function() {
		  var card = new Card('A', 'spades');
		  var player = new Player(1, false, [card], '2');

		  assert.strictEqual(player.isTrump(card, 'hearts', '2'), false);
		  assert.strictEqual(player.isTrump(card, 'spades', '2'), true);
		  assert.strictEqual(player.isTrump(card, 'hearts', 'A'), true);
		  assert.strictEqual(player.isTrump(card, 'spades', 'A'), true);
		})
	})
})

