var { findNumPairs, hasDoubles, checkIfAllDoubles, getDoubles, compareTwoHands, isNextHighestValue, hasTractorOfLength, compareRanks } = require('../CardHelper.js');
var Player = require('../Player.js');
var Card = require('../Card.js');
const { RankType, SuitType } = require('../CardEnum.js');
var assert = require('chai').assert;

describe('CardHelper', function() {
    describe('isNextHighestValue', function() {
        it('generic case', function() {
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card3 = new Card(RankType.SEVEN, SuitType.HEARTS);
            
            assert.strictEqual(isNextHighestValue(card, card2, RankType.TEN), true);
            assert.strictEqual(isNextHighestValue(card2, card, RankType.TEN), false);
            assert.strictEqual(isNextHighestValue(card, card3, RankType.TEN), false);
        })
        it('sandwiches trump rank', function() {
            var player = new Player(1, 'user1');
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card3 = new Card(RankType.EIGHT, SuitType.DIAMONDS);
            player.drawCard(card);
            player.drawCard(card2);
            player.drawCard(card3);
            player.setTrumpCards(SuitType.DIAMONDS, RankType.SEVEN);

            assert.strictEqual(isNextHighestValue(card, card2, RankType.SEVEN), false);
            assert.strictEqual(isNextHighestValue(card, card3, RankType.SEVEN), true);
            assert.strictEqual(isNextHighestValue(card2, card3, RankType.SEVEN), false);
        })
        it('high value trumps', function() {
            var player = new Player(1, 'user1');
            var card = new Card(RankType.ACE, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.HEARTS);
            var card3 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card4 = new Card(RankType.SMALL, SuitType.JOKERS);
            var card5 = new Card(RankType.BIG, SuitType.JOKERS);
            player.drawCard(card);
            player.drawCard(card2);
            player.drawCard(card3);
            player.drawCard(card4);
            player.drawCard(card5);
            player.setTrumpCards(SuitType.DIAMONDS, RankType.SEVEN);

            assert.strictEqual(isNextHighestValue(card, card2, RankType.SEVEN), true);
            assert.strictEqual(isNextHighestValue(card2, card3, RankType.SEVEN), true);
            assert.strictEqual(isNextHighestValue(card3, card4, RankType.SEVEN), true);
            assert.strictEqual(isNextHighestValue(card4, card5, RankType.SEVEN), true);

            assert.strictEqual(isNextHighestValue(card, card3, RankType.SEVEN), false);
            assert.strictEqual(isNextHighestValue(card2, card4, RankType.SEVEN), false);
            assert.strictEqual(isNextHighestValue(card3, card5, RankType.SEVEN), false);
        })
    })
})
