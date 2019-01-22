var { findNumPairs, hasDoubles, checkIfAllDoubles, getDoubles, compareTwoCards, isNextHighestValue, hasTractorOfLength, compareRanks } = require('../CardHelper.js');
var Player = require('../Player.js');
var Card = require('../Card.js');
const { RankType, SuitType } = require('../CardEnum.js');
var assert = require('chai').assert;

describe('CardHelper', function() {
    describe('findNumPairs', function() {
        it('no pairs', function() {
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card3 = new Card(RankType.SEVEN, SuitType.HEARTS);
            var card4 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card5 = new Card(RankType.EIGHT, SuitType.DIAMONDS);
            
            cards = [card, card2, card3, card4, card5];

            assert.strictEqual(findNumPairs(cards), 0); 
        })
        it('some pairs', function() {
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card4 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card5 = new Card(RankType.EIGHT, SuitType.HEARTS);
            var card7 = new Card(RankType.BIG, SuitType.JOKERS);
            
            cards = [card, card2, card2, card4, card5];

            assert.strictEqual(findNumPairs(cards), 1);
 
            cards = [card, card2, card2, card4, card5, card5, card7, card7];

            assert.strictEqual(findNumPairs(cards), 3); 
        }) 
    })
    describe('hasDoubles', function() {
        it('no doubles', function() {
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card3 = new Card(RankType.SEVEN, SuitType.HEARTS);
            var card4 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card5 = new Card(RankType.EIGHT, SuitType.DIAMONDS);
            
            cards = [card, card2, card3, card4, card5];

            assert.strictEqual(hasDoubles(cards), false); 
        })
        it('some doubles', function() {
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card4 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card5 = new Card(RankType.EIGHT, SuitType.HEARTS);
            var card7 = new Card(RankType.BIG, SuitType.JOKERS);
            
            cards = [card, card2, card2, card4, card5];

            assert.strictEqual(hasDoubles(cards), true);
 
            cards = [card, card2, card2, card4, card5, card5, card7, card7];

            assert.strictEqual(hasDoubles(cards), true); 
        }) 
    })
    describe('checkIfAllDoubles', function() {
        it('not all doubles', function() {
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card3 = new Card(RankType.SEVEN, SuitType.HEARTS);
            var card4 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card5 = new Card(RankType.EIGHT, SuitType.DIAMONDS);
            
            cards = [card, card2, card3, card4, card5];

            assert.strictEqual(checkIfAllDoubles(cards), false);

            cards = [card, card, card3, card4, card4];

            assert.strictEqual(checkIfAllDoubles(cards), false); 

        })
        it('all doubles', function() {
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card4 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card5 = new Card(RankType.EIGHT, SuitType.HEARTS);
            var card7 = new Card(RankType.BIG, SuitType.JOKERS);

            cards = [card, card, card2, card2, card4, card4, card5, card5, card7, card7];

            assert.strictEqual(checkIfAllDoubles(cards), true); 
        }) 
    })
    describe('getDoubles', function() {
        it('no doubles', function() {
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card3 = new Card(RankType.SEVEN, SuitType.HEARTS);
            var card4 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card5 = new Card(RankType.EIGHT, SuitType.DIAMONDS);
            
            cards = [card, card2, card3, card4, card5];

            assert.deepEqual(getDoubles(cards), []); 
        })
        it('some doubles', function() {
            var card = new Card(RankType.SIX, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card4 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card5 = new Card(RankType.EIGHT, SuitType.HEARTS);
            var card7 = new Card(RankType.BIG, SuitType.JOKERS);
            
            cards = [card, card2, card2, card4, card5];

            assert.deepEqual(getDoubles(cards), [card2]);
 
            cards = [card, card2, card2, card4, card5, card5, card7, card7];

            assert.deepEqual(getDoubles(cards), [card2, card5, card7]); 
        }) 
    })

    describe('compareTwoCards', function() {
        it('same suit', function() {
            var card = new Card(RankType.FIVE, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            
            assert.strictEqual(compareTwoCards(card, card2), false);
            assert.strictEqual(compareTwoCards(card2, card), true);
            assert.strictEqual(compareTwoCards(card, card), false);
        })
        it('both trump suit', function() {
            var card = new Card(RankType.FIVE, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card3 = new Card(RankType.TWO, SuitType.HEARTS);
            var card4 = new Card(RankType.TWO, SuitType.DIAMONDS);
            player = new Player(1, 'user1');
            player.drawCard(card);
            player.drawCard(card2);
            player.drawCard(card3);
            player.drawCard(card4);
            player.setTrumpCards(SuitType.DIAMONDS, RankType.TWO);
            
            assert.strictEqual(compareTwoCards(card, card2), false);
            assert.strictEqual(compareTwoCards(card2, card), true);
            assert.strictEqual(compareTwoCards(card, card), false);
            assert.strictEqual(compareTwoCards(card, card3), false);
            assert.strictEqual(compareTwoCards(card3, card2), true);
            assert.strictEqual(compareTwoCards(card3, card4), false);

        })
        it('different suits non trump', function() {
            var card = new Card(RankType.FIVE, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.HEARTS);
            
            assert.strictEqual(compareTwoCards(card, card2), true);
            assert.strictEqual(compareTwoCards(card2, card), true);
        })
        it('trump and non trump', function() {
            var card = new Card(RankType.FIVE, SuitType.DIAMONDS);
            var card2 = new Card(RankType.SEVEN, SuitType.HEARTS);
            player = new Player(1, 'user1');
            player.drawCard(card);
            player.drawCard(card2);
            player.setTrumpCards(SuitType.DIAMONDS, RankType.TWO);
            
            assert.strictEqual(compareTwoCards(card, card2), true);
            assert.strictEqual(compareTwoCards(card2, card), false);
        })
    })

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
