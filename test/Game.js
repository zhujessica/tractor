const { RankType, SuitType } = require('../CardEnum.js');
var Player = require('../Player.js');
var Card = require('../Card.js');
var Game = require('../Game.js');

var assert = require('chai').assert;

describe('Game', function() {
		describe('isNextHighestValue', function() {
        var player1 = new Player(1);
        var player2 = new Player(2);
        var player3 = new Player(3);
        var player4 = new Player(4);
        var game = new Game([player1, player2, player3, player4]);

				it('one trump one non trump', function() {	
            game.trumpRank = 2;
            game.trumpSuit = SuitType.CLUBS;
            var card1 = new Card(RankType.THREE, SuitType.CLUBS);
            card1.isTrump = true;
            var card2 = new Card(RankType.FIVE, SuitType.DIAMONDS);
            assert.strictEqual(game.isNextHighestValue(card1, card2), false);
        })
        it ('two non trumps, nonconsecutive', function() {
            game.trumpRank = 6;
            game.trumpSuit = SuitType.CLUBS;
            var card1 = new Card(RankType.THREE, SuitType.DIAMONDS);
            var card2 = new Card(RankType.FIVE, SuitType.DIAMONDS);
            var card3 = new Card(RankType.FOUR, SuitType.HEARTS);
            var card4 = new Card(RankType.FOUR, SuitType.DIAMONDS);
            var card5 = new Card(RankType.SEVEN, SuitType.SPADES);

            // non-numerical consecutive
            assert.strictEqual(game.isNextHighestValue(card1, card2), false);
            // different suits
            assert.strictEqual(game.isNextHighestValue(card1, card3), false);
            assert.strictEqual(game.isNextHighestValue(card2, card5), false);
            // wrong order
            assert.strictEqual(game.isNextHighestValue(card4, card1), false);
        })
        it ('two non trumps, consecutive', function() {
            game.trumpRank = 5;
            game.trumpSuit = SuitType.DIAMONDS;

            var card1 = new Card(RankType.TEN, SuitType.CLUBS);
            var card2 = new Card(RankType.JACK, SuitType.CLUBS);
            var card3 = new Card(RankType.FOUR, SuitType.HEARTS);
            var card4 = new Card(RankType.SIX, SuitType.HEARTS);
            var card5 = new Card(RankType.ACE, SuitType.SPADES);
            var card6 = new Card(RankType.TWO, SuitType.SPADES);

            // check consecutive numbers
            assert.strictEqual(game.isNextHighestValue(card1, card2), true);
            // check jump over trump rank
            assert.strictEqual(game.isNextHighestValue(card3, card4), true);
            // check ace and two consecutive
            assert.strictEqual(game.isNextHighestValue(card5, card6), true);
        })
        it ('two trumps, nonconsecutive', function() {
            game.trumpRank = 2;
            game.trumpSuit = SuitType.DIAMONDS;

            var card1 = new Card(RankType.THREE, SuitType.DIAMONDS);
            card1.isTrump = true;
            var card2 = new Card(RankType.FIVE, SuitType.DIAMONDS);
            card2.isTrump = true;
            var card3 = new Card(RankType.TWO, SuitType.CLUBS);
            card3.isTrump = true;
            var card4 = new Card(RankType.TWO, SuitType.SPADES);
            card4.isTrump = true;
            var card5 = new Card(RankType.TWO, SuitType.DIAMONDS);
            card5.isTrump = true;
            var card6 = new Card(RankType.SMALL, SuitType.JOKERS);
            card6.isTrump = true;
            var card7 = new Card(RankType.ACE, SuitType.DIAMONDS);
            card7.isTrump = true;

            // non-numerical consecutive
            assert.strictEqual(game.isNextHighestValue(card1, card2), false);
            // trump rank non consecutive
            assert.strictEqual(game.isNextHighestValue(card3, card1), false);
            assert.strictEqual(game.isNextHighestValue(card5, card1), false);
            // trump rank same level
            assert.strictEqual(game.isNextHighestValue(card3, card4), false);
            // non trump suit rank and small joker
            assert.strictEqual(game.isNextHighestValue(card3, card6), false);
            // ace and trump 2
            assert.strictEqual(game.isNextHighestValue(card7, card5), false);

        })
        it ('two trumps, consecutive', function() {
            game.trumpRank = RankType.TWO;
            game.trumpSuit = SuitType.DIAMONDS;

            var card1 = new Card(RankType.THREE, SuitType.DIAMONDS);
            card1.isTrump = true;
            var card2 = new Card(RankType.FOUR, SuitType.DIAMONDS);
            card2.isTrump = true;
            var card3 = new Card(RankType.TWO, SuitType.CLUBS);
            card3.isTrump = true;
            var card4 = new Card(RankType.TWO, SuitType.DIAMONDS);
            card4.isTrump = true;
            var card5 = new Card(RankType.SMALL, SuitType.JOKERS);
            card5.isTrump = true;
            var card6 = new Card(RankType.ACE, SuitType.DIAMONDS);
            card6.isTrump = true;
            var card7 = new Card(RankType.BIG, SuitType.JOKERS);
            card7.isTrump = true;

            // numerical consecutive
            assert.strictEqual(game.isNextHighestValue(card1, card2), true);
            // ace to trump rank
            assert.strictEqual(game.isNextHighestValue(card6, card3), true);
            // non trump suit rank to trump suit rank
            assert.strictEqual(game.isNextHighestValue(card3, card4), true);
            // trump suit rank to small joker
            assert.strictEqual(game.isNextHighestValue(card4, card5), true);
            // small to big joker
            assert.strictEqual(game.isNextHighestValue(card5, card7), true);

            game.trumpRank = 5;

            var card8 = new Card(RankType.FOUR, SuitType.DIAMONDS);
            card8.isTrump = true;
            var card9 = new Card(RankType.SIX, SuitType.DIAMONDS);
            card9.isTrump = true;

            // numerical skip trump rank
            assert.strictEqual(game.isNextHighestValue(card8, card9), true);
            
        })
    })
})

