var Player = require('../Player.js');
var Card = require('../Card.js');
var assert = require('chai').assert;

const { RankType, SuitType } = require('../CardEnum.js');

describe('Player', function() {
    describe('drawCard', function() {
		    it('adds new card to hand', function() {	
				    var card = new Card(RankType.ACE, SuitType.SPADES, true);
						var card2 = new Card(RankType.JACK, SuitType.HEARTS, false);
						var card3 = new Card(RankType.TWO, SuitType.DIAMONDS, false);
						
						var player = new Player(1);
						
						player.drawCard(card);
						assert.deepEqual(player.cards[SuitType.SPADES], [card]);
						player.drawCard(card2);
						assert.deepEqual(player.cards[SuitType.HEARTS], [card2]);
						player.drawCard(card3);
						assert.deepEqual(player.cards[SuitType.DIAMONDS], [card3]);
				})
		})

		describe('isValidPlay', function() {
		    it('single non trump card starting play, valid play', function() {
							var card = new Card(RankType.ACE, SuitType.SPADES, false);

							// plays same suit as original
							var card2 = new Card(RankType.THREE, SuitType.SPADES, false);
							player = new Player(1);
							player.drawCard(card2);
							assert.strictEqual(player.isValidPlay([card], [card2]), true);

							// plays different non trump suit from original, when player is void in original suit
							var card2 = new Card(RankType.THREE, SuitType.DIAMONDS, false);
							player = new Player(1);
							player.drawCard(card2);
							assert.strictEqual(player.isValidPlay([card], [card2]), true);

							// plays trump suit, when player is void in original suit
							var card2 = new Card(RankType.THREE, SuitType.HEARTS, true);
							card2.isTrump = true;
							player.drawCard(card2);
							assert.strictEqual(player.isValidPlay([card], [card2]), true);
			  })
				it('single non trump card starting play, invalid play', function() {
						//TODO
				})
				it('single trump card starting play, valid play', function() {
						//TODO
				})
				it ('single trump card starting play, invalid play', function() {
						//TODO
				})
				it('single card left, not first to play', function() {
						var card = new Card(RankType.ACE, SuitType.SPADES, true);
						var card2 = new Card(RankType.FIVE, SuitType.HEARTS, false);
						player = new Player(1);
						player.drawCard(card2);
						
						assert.strictEqual(player.isValidPlay([card], [card2]), true);

						var card2 = new Card(RankType.FIVE, SuitType.SPADES);
						player = new Player(1);
						player.drawCard(card2);
						assert.strictEqual(player.isValidPlay([card], [card2]), true);

						var card2 = new Card(RankType.THREE, SuitType.HEARTS);
						player = new Player(1);
						player.drawCard(card2);
						assert.strictEqual(player.isValidPlay([card], [card2]), true);

						var card2 = new Card(RankType.FIVE, SuitType.DIAMONDS);
						player = new Player(1);
						player.drawCard(card2);
						assert.strictEqual(player.isValidPlay([card], [card2]), true); 
				})
				it('multiple cards left, first to play', function() {
						var card = new Card(RankType.ACE, SuitType.SPADES, true);
						var card2 = new Card(RankType.JACK, SuitType.HEARTS, false);
						player = new Player(1);
						player.drawCard(card);
						player.drawCard(card2);

						assert.strictEqual(player.isValidPlay([card], [card]), true); 
				})
				it('multiple cards left, not first to play', function() {
						var card = new Card(RankType.ACE, SuitType.SPADES, true);
						
						// no card of suit
						var card2 = new Card(RankType.FIVE, SuitType.HEARTS, false);
						var card3 = new Card(RankType.SEVEN, SuitType.DIAMONDS, false);
						player = new Player(1);
						player.drawCard(card2);
						player.drawCard(card3);

						assert.strictEqual(player.isValidPlay([card], [card2]), true);

						// card of suit but not played
						var card2 = new Card(RankType.FIVE, SuitType.HEARTS, false);
						var card3 = new Card(RankType.SEVEN, SuitType.SPADES, true);
						player = new Player(1);
						player.drawCard(card2);
						player.drawCard(card3);
						assert.strictEqual(player.isValidPlay([card], [card2]), false);

						// card of suit and played
						var card2 = new Card(RankType.FIVE, SuitType.HEARTS, false);
						var card3 = new Card(RankType.SEVEN, SuitType.SPADES, true);
						player = new Player(1);
						player.drawCard(card2);
						player.drawCard(card3);

						assert.strictEqual(player.isValidPlay([card], [card3]), true);
				})
		})

		describe('isTrump()', function() {
				it('suit is trump suit', function() {
						var card = new Card(RankType.ACE, SuitType.SPADES, true);
						var player = new Player(1);

						assert.strictEqual(player.isTrump(card, SuitType.HEARTS, RankType.TWO), false);
						assert.strictEqual(player.isTrump(card, SuitType.SPADES, RankType.TWO), true);
						assert.strictEqual(player.isTrump(card, SuitType.HEARTS, RankType.ACE), true);
						assert.strictEqual(player.isTrump(card, SuitType.SPADES, RankType.ACE), true);
				})
		})

		describe('hasTrump()', function() {
				//TODO	
		})
		
		describe('setTrumpCards()', function() {
				//TODO
		})
})

