var Player = require('../Player.js');
var Card = require('../Card.js');
const { RankType, SuitType } = require('../CardEnum.js');
var assert = require('chai').assert;

describe('Player', function() {
    describe('drawCard', function() {
        it('adds new card to hand', function() {    
            var card = new Card(RankType.ACE, SuitType.SPADES);
            var card2 = new Card(RankType.JACK, SuitType.HEARTS);
            var card3 = new Card(RankType.TWO, SuitType.DIAMONDS);
            
            var player = new Player(1);
            
            player.drawCard(card);
            assert.deepEqual(player.cards[SuitType.SPADES], [card]);
            player.drawCard(card2);
            assert.deepEqual(player.cards[SuitType.HEARTS], [card2]);
            player.drawCard(card3);
            assert.deepEqual(player.cards[SuitType.DIAMONDS], [card3]);
        })
    })

    describe('sortCards', function() {
        it('sorts one suit', function() {
            var card = new Card(RankType.TWO, SuitType.SPADES);
            var card2 = new Card(RankType.THREE, SuitType.SPADES);
            var card3 = new Card(RankType.KING, SuitType.SPADES);
            var player = new Player(1);

            player.drawCard(card2);
            player.drawCard(card3);
            player.drawCard(card);
            player.sortCards();
 
            expectedRanks = [RankType.TWO, RankType.THREE, RankType.KING];
            actualRanks = player.cards[SuitType.SPADES].map(x => x.rank);

            assert.deepEqual(actualRanks, expectedRanks);
        })
        it('sorts multiple suits', function() {
            var card = new Card(RankType.TWO, SuitType.SPADES);
            var card2 = new Card(RankType.THREE, SuitType.SPADES);
            var card3 = new Card(RankType.KING, SuitType.SPADES);
            var card4 = new Card(RankType.FIVE, SuitType.HEARTS);
            var card5 = new Card(RankType.SEVEN, SuitType.HEARTS);
            var player = new Player(1);

            player.drawCard(card2);
            player.drawCard(card3);
            player.drawCard(card);
            player.drawCard(card5);
            player.drawCard(card4);
            player.sortCards();
 
            var expectedRanks = [RankType.TWO, RankType.THREE, RankType.KING];
            var actualRanks = player.cards[SuitType.SPADES].map(x => x.rank);

            assert.deepEqual(actualRanks, expectedRanks);

            expectedRanks = [RankType.FIVE, RankType.SEVEN];
            actualRanks = player.cards[SuitType.HEARTS].map(x => x.rank);
            
            assert.deepEqual(actualRanks, expectedRanks);
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

            var card2 = new Card(RankType.FIVE, SuitType.SPADES, true);
            player = new Player(1);
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([card], [card2]), true);

            var card2 = new Card(RankType.THREE, SuitType.HEARTS, false);
            player = new Player(1);
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([card], [card2]), true);

            var card2 = new Card(RankType.FIVE, SuitType.DIAMONDS, false);
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
        it('non trump tractor starting play, valid play', function() {
            var startingCard1 = new Card(RankType.THREE, SuitType.SPADES);
            var startingCard2 = new Card(RankType.FOUR, SuitType.SPADES);

            var card1 = new Card(RankType.FIVE, SuitType.SPADES);
            var card2 = new Card(RankType.SIX, SuitType.SPADES);
            var card3 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card4 = new Card(RankType.JACK, SuitType.SPADES);
            var card5 = new Card(RankType.ACE, SuitType.SPADES);
            var card6 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card7 = new Card(RankType.EIGHT, SuitType.DIAMONDS);

            // not enough of the same suit
            player = new Player(1);
            player.drawCard(card1);
            player.drawCard(card2);
            player.drawCard(card6);
            player.drawCard(card7);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2],
                [card1, card2, card6, card7]), true);

            // no doubles, just singles
            player.drawCard(card3);
            player.drawCard(card4);
            player.drawCard(card5);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card2, card3, card4]), true);

            // one double, some singles
            player.drawCard(card1);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card1, card5, card3]), true);

            // some doubles
            player.drawCard(card3);
            player.drawCard(card4);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card3, card3, card4, card4]), true);

            // tractor
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card1, card2, card2]), true);

            // non-consecutive tractor
            player.trumpRank = 6;
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card1, card3, card3]), true);

        })
        it('non trump tractor starting play, invalid play', function() {
            var startingCard1 = new Card(RankType.THREE, SuitType.SPADES);
            var startingCard2 = new Card(RankType.FOUR, SuitType.SPADES);

            var card1 = new Card(RankType.FIVE, SuitType.SPADES);
            var card2 = new Card(RankType.SIX, SuitType.SPADES);
            var card3 = new Card(RankType.SEVEN, SuitType.SPADES);
            var card4 = new Card(RankType.JACK, SuitType.SPADES);
            var card5 = new Card(RankType.ACE, SuitType.SPADES);
            var card6 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card7 = new Card(RankType.EIGHT, SuitType.DIAMONDS);

            // not enough of the same suit, but doesn't play all of them
            player = new Player(1);
            player.drawCard(card1);
            player.drawCard(card2);
            player.drawCard(card6);
            player.drawCard(card6);
            player.drawCard(card7);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2],
                [card1, card6, card6, card7]), false);

            // one double, doesn't play it
            player.drawCard(card3);
            player.drawCard(card4);
            player.drawCard(card5);
            player.drawCard(card1);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card2, card5, card3]), false);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card4, card2, card5, card3]), false);

            // some doubles, only plays one pair
            player.drawCard(card3);
            player.drawCard(card4);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card3, card3, card1, card5]), false);

            // has tractor, doesn't play it
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card1, card3, card3]), false);
        })
        it('trump tractor starting play, valid play', function() {
            var startingCard1 = new Card(RankType.THREE, SuitType.SPADES);
            var startingCard2 = new Card(RankType.FOUR, SuitType.SPADES);
            startingCard1.isTrump = true;
            startingCard2.isTrump = true;

            var card1 = new Card(RankType.FIVE, SuitType.SPADES);
            card1.isTrump = true;
            var card2 = new Card(RankType.SIX, SuitType.SPADES);
            card2.isTrump = true;
            var card3 = new Card(RankType.SEVEN, SuitType.SPADES);
            card3.isTrump = true;
            var card4 = new Card(RankType.JACK, SuitType.SPADES);
            card4.isTrump = true;
            var card5 = new Card(RankType.ACE, SuitType.SPADES);
            card5.isTrump = true;
            var card6 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card7 = new Card(RankType.EIGHT, SuitType.DIAMONDS);
            var card8 = new Card(RankType.TWO, SuitType.CLUBS);
            card8.isTrump = true;
            card8.isTrumpRank = true;
            var card9 = new Card(RankType.TWO, SuitType.DIAMONDS);
            card9.isTrump = true;
            card9.isTrumpRank = true;
            var card10 = new Card(RankType.TWO, SuitType.SPADES);
            card10.isTrump = true;
            card10.isTrumpRank = true;
            card10.isTrumpSuit = true;
            var card11 = new Card(RankType.SMALL, SuitType.JOKERS);
            card11.isTrump = true;
            var card12 = new Card(RankType.BIG, SuitType.JOKERS);
            card12.isTrump = true;

            // not enough of trump suit
            player = new Player(1);
            player.drawCard(card1);
            player.drawCard(card2);
            player.drawCard(card6);
            player.drawCard(card7);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2],
                [card1, card2, card6, card7]), true);

            // no doubles, just singles
            player.drawCard(card3);
            player.drawCard(card4);
            player.drawCard(card5);
            player.drawCard(card11);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card2, card3, card4]), true);

            // one double, some singles
            player.drawCard(card1);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card1, card5, card3]), true);

            // some doubles
            player.drawCard(card3);
            player.drawCard(card4);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card3, card3, card4, card4]), true);

            // tractor
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card1, card2, card2]), true);

            // tractor
            player.drawCard(card8);
            player.drawCard(card8);
            player.drawCard(card10);
            player.drawCard(card10);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card8, card8, card10, card10]), true);
            
            // joker tractors
            player.drawCard(card11);
            player.drawCard(card12);
            player.drawCard(card11);
            player.drawCard(card12);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card10, card10, card11, card11]), true);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card12, card12, card11, card11]), true);

        })
        it('trump tractor starting play, invalid play', function() {
            var startingCard1 = new Card(RankType.THREE, SuitType.SPADES);
            var startingCard2 = new Card(RankType.FOUR, SuitType.SPADES);
            startingCard1.isTrump = true;
            startingCard2.isTrump = true;

            var card1 = new Card(RankType.FIVE, SuitType.SPADES);
            card1.isTrump = true;
            var card2 = new Card(RankType.SIX, SuitType.SPADES);
            card2.isTrump = true;
            var card3 = new Card(RankType.SEVEN, SuitType.SPADES);
            card3.isTrump = true;
            var card4 = new Card(RankType.JACK, SuitType.SPADES);
            card4.isTrump = true;
            var card5 = new Card(RankType.ACE, SuitType.SPADES);
            card5.isTrump = true;
            var card6 = new Card(RankType.SEVEN, SuitType.DIAMONDS);
            var card7 = new Card(RankType.EIGHT, SuitType.DIAMONDS);
            var card8 = new Card(RankType.TWO, SuitType.CLUBS);
            card8.isTrump = true;
            card8.isTrumpRank = true;
            var card9 = new Card(RankType.TWO, SuitType.DIAMONDS);
            card9.isTrump = true;
            card9.isTrumpRank = true;
            var card10 = new Card(RankType.TWO, SuitType.SPADES);
            card10.isTrump = true;
            card10.isTrumpRank = true;
            card10.isTrumpSuit = true;
            var card11 = new Card(RankType.SMALL, SuitType.JOKERS);
            card11.isTrump = true;
            var card12 = new Card(RankType.BIG, SuitType.JOKERS);
            card12.isTrump = true;

            // not enough of trump suit, but doesn't play all of them
            player = new Player(1);
            player.drawCard(card1);
            player.drawCard(card2);
            player.drawCard(card6);
            player.drawCard(card6);
            player.drawCard(card7);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2],
                [card1, card6, card6, card7]), false);
                
            // one double, sone singles, doesn't play double
            player.drawCard(card3);
            player.drawCard(card4);
            player.drawCard(card5);
            player.drawCard(card11);
            player.drawCard(card1);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card2, card5, card3]), false);

            // some doubles, only plays one pair
            player.drawCard(card3);
            player.drawCard(card4);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card3, card3, card1, card4]), false);

            // has tractor, doesn't play
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([startingCard1, startingCard1, startingCard2, startingCard2], 
                [card1, card1, card3, card3]), false);
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
        it('has no trump', function() {
            var card = new Card(RankType.FIVE, SuitType.HEARTS);
            var card2 = new Card(RankType.SEVEN, SuitType.SPADES);
            var player = new Player(1);
            player.drawCard(card);
            player.drawCard(card2);

            assert.strictEqual(player.hasTrump(), false);
        })
        it('has trump suit', function() {
            var card = new Card(RankType.FIVE, SuitType.HEARTS);
            var card2 = new Card(RankType.SEVEN, SuitType.SPADES);
            card2.isTrump = true;
            var player = new Player(1);
            player.drawCard(card);
            player.drawCard(card2);

            assert.strictEqual(player.hasTrump(), true);
        })
    })
        
    describe('setTrumpCards()', function() {
        it('sets trump suit correctly', function() {
            var card = new Card(RankType.FIVE, SuitType.HEARTS, false);
            var card2 = new Card(RankType.SEVEN, SuitType.SPADES, false);
            player = new Player(1);
            player.drawCard(card);
            player.drawCard(card2);
            assert.strictEqual(player.setTrumpCards(SuitType.SPADES, RankType.TWO), 1);

            assert.strictEqual(card.isTrump, false);
            assert.strictEqual(card2.isTrump, true);
        })

        it('sets trump number correctly', function() {
            var card = new Card(RankType.FIVE, SuitType.HEARTS, false);
            var card2 = new Card(RankType.SEVEN, SuitType.SPADES, false);
            player = new Player(1);
            player.drawCard(card);
            player.drawCard(card2);
            assert.strictEqual(player.setTrumpCards(SuitType.CLUBS, RankType.FIVE), 1);

            assert.strictEqual(card.isTrump, true);
            assert.strictEqual(card2.isTrump, false);
        })

        it('adds new card to hand', function() {    
            var card = new Card(RankType.ACE, SuitType.SPADES, true);
            var card2 = new Card(RankType.JACK, SuitType.HEARTS, false);
            var card3 = new Card(RankType.TWO, SuitType.DIAMONDS, false);
            
            var player = new Player(1);
            
            player.drawCard(card);
            assert.deepEqual(player.cards['spades'], [card]);
            player.drawCard(card2);
            assert.deepEqual(player.cards['hearts'], [card2]);
            player.drawCard(card3);
            assert.deepEqual(player.cards['diamonds'], [card3]);
        })
    })

    describe('isValidPlay', function() {
        it('single non trump card starting play, valid play', function() {
            var card = new Card(RankType.ACE, SuitType.SPADES, false);

            // plays same suit as original
            var card2 = new Card(RankType.THREE, SuitType.SPADES, true);
            player = new Player(1);
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([card], [card2]), true);

            // plays different non trump suit from original, when player is void in original suit
            var card2 = new Card(RankType.THREE, SuitType.DIAMONDS, false);
            player = new Player(1);
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([card], [card2]), true);

            // plays trump suit (nmber), when player is void in original suit
            var card2 = new Card(RankType.TWO, 'diamonds', false);
            card2.isTrump = true;
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([card], [card2]), true);

        })
        it('single non trump card starting play, invalid play', function() {

        })
        it('single trump card starting play, valid play', function() {

        })
        it ('single trump card startingp play, invalid play', function() {

        })
        it('single card left, not first to play', function() {
            var card = new Card(RankType.ACE, SuitType.SPADES, true);

            var card2 = new Card(RankType.FIVE, SuitType.HEARTS, false);
            player = new Player(1);
            player.drawCard(card2);
            
            assert.strictEqual(player.isValidPlay([card], [card2]), true);

            var card2 = new Card(RankType.FIVE, SuitType.SPADES, true);
            player = new Player(1);
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([card], [card2]), true);

            var card2 = new Card(RankType.THREE, SuitType.HEARTS, false);
            player = new Player(1);
            player.drawCard(card2);
            assert.strictEqual(player.isValidPlay([card], [card2]), true);

            var card2 = new Card(RankType.FIVE, SuitType.DIAMONDS, false);
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

            assert.strictEqual(player.isValidPlay([card], [card2], 'diamonds', '3'), true);

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
            var card = new Card(RankType.ACE, SuitType.SPADES, false);
            var player = new Player(1);

            assert.strictEqual(player.isTrump(card, SuitType.HEARTS, RankType.TWO), false);
            assert.strictEqual(player.isTrump(card, SuitType.SPADES, RankType.TWO), true);
            assert.strictEqual(player.isTrump(card, SuitType.HEARTS, RankType.ACE), true);
            assert.strictEqual(player.isTrump(card, SuitType.SPADES, RankType.ACE), true);
        })
    })

    describe ('hasCard', function() {
        it('correctly determines when has card and card is not a joker', function() {
            var player = new Player(1);
            var card = new Card(RankType.TEN, SuitType.SPADES);
            player.drawCard(card);
            assert.strictEqual(player.hasCard(new Card(RankType.TEN, SuitType.SPADES)), true);
        })

        it('correctly determines when does not have card and card is not a joker', function() {
            var player = new Player(1);
            var card = new Card(RankType.THREE, SuitType.SPADES);
            player.drawCard(card);
            assert.strictEqual(player.hasCard(new Card(RankType.THREE, SuitType.HEARTS)), false);
        })

        it('correctly determines when does not have card and card is a joker', function() {
            var player = new Player(1);
            assert.strictEqual(player.hasCard(new Card(RankType.BIG, SuitType.JOKERS)), false);
        })
    })

    describe('setVault', function() {
        it('correctly sets vault', function() {
            var player = new Player(1);
            player.banker = true;
            player.drawCard(new Card(RankType.TEN, SuitType.SPADES));
            player.drawCard(new Card(RankType.FIVE, SuitType.SPADES));
            player.drawCard(new Card(RankType.THREE, SuitType.SPADES));
            player.drawCard(new Card(RankType.TEN, SuitType.HEARTS));
            player.drawCard(new Card(RankType.TWO, SuitType.CLUBS));
            player.drawCard(new Card(RankType.FOUR, SuitType.CLUBS));
            player.drawCard(new Card(RankType.SIX, SuitType.CLUBS));
            player.drawCard(new Card(RankType.EIGHT, SuitType.CLUBS));
            player.drawCard(new Card(RankType.TEN, SuitType.DIAMONDS));
            player.drawCard(new Card(RankType.TEN, SuitType.DIAMONDS));
            player.drawCard(new Card(RankType.TWO, SuitType.DIAMONDS));

            player.vault = [
                new Card(RankType.TEN, SuitType.SPADES),
                new Card(RankType.FIVE, SuitType.SPADES),
                new Card(RankType.THREE, SuitType.SPADES),
                new Card(RankType.TEN, SuitType.DIAMONDS),
                new Card(RankType.TWO, SuitType.DIAMONDS),
                new Card(RankType.TWO, SuitType.CLUBS),
                new Card(RankType.FOUR, SuitType.CLUBS),
                new Card(RankType.SIX, SuitType.CLUBS),
            ]

            player.setVault();

            assert.deepEqual(player.cards, {
                'spades': [],
                'hearts': [new Card(RankType.TEN, SuitType.HEARTS)],
                'diamonds': [new Card(RankType.TEN, SuitType.DIAMONDS)],
                'clubs': [new Card(RankType.EIGHT, SuitType.CLUBS)],
                'jokers': [],
            })
        })
    })

    describe('addToVault', function() {
        it('correctly adds to vault', function() {
            var card = new Card(RankType.THREE, SuitType.DIAMONDS);
            player = new Player(1);
            player.banker = true;
            player.drawCard(card);
            player.addToVault(card);
            assert.deepEqual(player.vault, [card]);
        })
    })

    describe('removeFromVault', function() {
        it('correctly removes from vault when only one card', function() {
            var card = new Card(RankType.THREE, SuitType.DIAMONDS);
            player = new Player(1);
            player.banker = true;
            player.drawCard(card);
            player.addToVault(card);
            player.removeFromVault(card);
            assert.deepEqual(player.vault, []);
        })

        it ('removes correct card from vault', function() {
            var card1 = new Card(RankType.THREE, SuitType.DIAMONDS);
            var card2 = new Card(RankType.THREE, SuitType.SPADES);
            player = new Player(1);
            player.banker = true;
            player.drawCard(card1);
            player.drawCard(card2);
            player.addToVault(card1);
            player.addToVault(card2);
            assert.deepEqual(player.vault, [card1, card2]);
            player.removeFromVault(card1);
            assert.deepEqual(player.vault, [card2]);
        })

        it('correctly removes from vault with duplicate card', function() {
            var card = new Card(RankType.THREE, SuitType.DIAMONDS);
            player = new Player(1);
            player.banker = true;
            player.drawCard(card);
            player.drawCard(card);
            player.addToVault(card);
            player.addToVault(card);
            assert.deepEqual(player.vault, [card, card]);
            player.removeFromVault(card);
            assert.deepEqual(player.vault, [card]);
        })
    })
})
