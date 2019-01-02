var Card = require('../Card.js');
var Player = require('../Player.js');
var Round = require('../Round.js');
const { RankType, SuitType } = require('../CardEnum.js');
var assert = require('assert');

describe('Round', function() {
    describe('init', function() {
        it('correctly intializes round', function() {
            var p1 = new Player(1, true, 2);
            var p2 = new Player(2, false, 2);
            var p3 = new Player(3, false, 2);
            var p4 = new Player(4, false, 2);
            var players = [p1, p2, p3, p4];
            var round = new Round(players, {p1: [], p2: [], p3: [], p4: []});
            assert.deepEqual(round.players, players);
            assert.strictEqual(round.totalPoints, 0);
            assert.deepEqual(round.playedCards, {p1: [], p2: [], p3: [], p4: []});
        })
    })
    // describe('playCards', function() {
    //     it('correctly adds cards played by first player', function() {
    //         var p1 = new Player(1, true, 2);
    //         var p2 = new Player(2, false, 2);
    //         var p3 = new Player(3, false, 2);
    //         var p4 = new Player(4, false, 2);
    //         var players = [p1, p2, p3, p4];
    //         var round = new Round(players, p1, {});
    //         var king = new Card(RankType.KING, SuitType.SPADES);
    //         round.playCards(p1, [king]);
    //         assert.strictEqual(round.totalPoints, 10);
    //         assert.deepEqual(round.playedCards, {1: [king]});
    //     })

    //     it('correctly adds cards played by many players', function() {
    //         var p1 = new Player(1, true, 2);
    //         var p2 = new Player(2, false, 2);
    //         var p3 = new Player(3, false, 2);
    //         var p4 = new Player(4, false, 2);
    //         var players = [p1, p2, p3, p4];
    //         var round = new Round(players, p1, {});
    //         var king = new Card(RankType.KING, SuitType.SPADES);
    //         var five = new Card(RankType.FIVE, SuitType.SPADES);
    //         var three = new Card(RankType.THREE, SuitType.SPADES);
    //         round.playCards(p1, [king]);
    //         assert.strictEqual(round.totalPoints, 10);
    //         assert.deepEqual(round.playedCards, {1: [king]});
    //         round.playCards(p2, [three]);
    //         assert.strictEqual(round.totalPoints, 10);
    //         assert.deepEqual(round.playedCards, {1: [king], 2: [three]});
    //         round.playCards(p3, [five]);
    //         assert.strictEqual(round.totalPoints, 15);
    //         assert.deepEqual(round.playedCards, {1: [king], 2: [three], 3: [five]});
    //     })
    // })
    describe('determineRoundHighest', function() {
        it('correctly determines round highest, single', function() {
            var p1 = new Player(1);
            var p2 = new Player(2);
            var p3 = new Player(3);
            var p4 = new Player(4);
            var players = [p1, p2, p3, p4];
            var card1 = new Card(RankType.KING, SuitType.SPADES);
            var card2 = new Card(RankType.ACE, SuitType.DIAMONDS);
            var card3 = new Card(RankType.TWO, SuitType.DIAMONDS);
            var card4 = new Card(RankType.FIVE, SuitType.DIAMONDS);
            var playedCards = {1: [card1], 2: [card2], 3: [card3], 4: [card4]};
            var round = new Round(players, playedCards);
            assert.strictEqual(round.determineRoundHighest(), p1);

            card2.isTrump = true;
            card2.isTrumpSuit = true;
            card3.isTrump = true;
            card3.isTrumpSuit = true;
            card4.isTrump = true;
            card4.isTrumpSuit = true;
            var playedCards = {1: [card1], 2: [card2], 3: [card3], 4: [card4]};
            var round = new Round(players, playedCards);
            assert.strictEqual(round.determineRoundHighest(), p2);

            card3.isTrumpRank = true;
            var playedCards = {1: [card1], 2: [card2], 3: [card3], 4: [card4]};
            var round = new Round(players, playedCards);
            assert.strictEqual(round.determineRoundHighest(), p3);

            card1.isTrump = true;
            card1.isTrumpSuit = true;
            card2.isTrump = false;
            card2.isTrumpSuit = false;
            card3.isTrump = false;
            card3.isTrumpSuit = false;
            card4.isTrumpRank = true;
            var playedCards = {1: [card1], 2: [card2], 3: [card3], 4: [card4]};
            var round = new Round(players, playedCards);
            assert.strictEqual(round.determineRoundHighest(), p4);
        })
        it('correctly determines round highest, double', function() {
            var p1 = new Player(1);
            var p2 = new Player(2);
            var p3 = new Player(3);
            var p4 = new Player(4);
            var players = [p1, p2, p3, p4];
            var card1 = new Card(RankType.KING, SuitType.SPADES);
            var card2 = new Card(RankType.ACE, SuitType.DIAMONDS);
            var card3 = new Card(RankType.TWO, SuitType.DIAMONDS);
            var card4 = new Card(RankType.FIVE, SuitType.DIAMONDS);
            var playedCards = {1: [card1, card1], 2: [card2, card2], 3: [card3, card3], 4: [card4, card4]};
            var round = new Round(players, playedCards);
            assert.strictEqual(round.determineRoundHighest(), p1);

            card2.isTrump = true;
            card2.isTrumpSuit = true;
            card3.isTrump = true;
            card3.isTrumpSuit = true;
            card4.isTrump = true;
            card4.isTrumpSuit = true;
            var playedCards = {1: [card1, card1], 2: [card2, card2], 3: [card3, card3], 4: [card4, card4]};
            var round = new Round(players, playedCards);
            assert.strictEqual(round.determineRoundHighest(), p2);

            var playedCards = {1: [card1, card1], 2: [card1, card2], 3: [card3, card3], 4: [card4, card2]};
            var round = new Round(players, playedCards);
            assert.strictEqual(round.determineRoundHighest(), p3);

            card4.isTrumpRank = true;
            var playedCards = {1: [card1, card1], 2: [card2, card2], 3: [card3, card3], 4: [card4, card4]};
            var round = new Round(players, playedCards);
            assert.strictEqual(round.determineRoundHighest(), p4);
        })
        it('correctly determines round highest, tractors', function() {
            // var p1 = new Player(1);
            // var p2 = new Player(2);
            // var p3 = new Player(3);
            // var p4 = new Player(4);
            // var players = [p1, p2, p3, p4];
            // var card1 = new Card(RankType.QUEEN, SuitType.SPADES);
            // var card2 = new Card(RankType.ACE, SuitType.DIAMONDS);
            // var card3 = new Card(RankType.TWO, SuitType.DIAMONDS);
            // var card4 = new Card(RankType.FIVE, SuitType.DIAMONDS);
            // var card5 = new Card(RankType.KING, SuitType.SPADES);
            // var card6 = new Card(RankType.FOUR, SuitType.SPADES);
            // var card7 = new Card(RankType.FIVE, SuitType.SPADES);
            // var card8 = new Card(RankType.ACE, SuitType.SPADES);
            // var card9 = new Card(RankType.KING, SuitType.DIAMONDS);
            // var playedCards = {
            //     1: [card1, card1, card5, card5], 
            //     2: [card6, card6, card7, card7], 
            //     3: [card8, card8, card3, card3], 
            //     4: [card4, card4, card2, card2]
            // };
            // var round = new Round(players, playedCards);
            // assert.strictEqual(round.determineRoundHighest(), p1);

            // card2.isTrump = true;
            // card2.isTrumpSuit = true;
            // card3.isTrump = true;
            // card3.isTrumpSuit = true;
            // card3.isTrumpRank = true;
            // card4.isTrump = true;
            // card4.isTrumpSuit = true;
            // card9.isTrump = true;
            // card9.isTrumpSuit = true;
            // var playedCards = {
            //     1: [card1, card1, card5, card5], 
            //     2: [card9, card9, card2, card2], 
            //     3: [card3, card3, card4, card4], 
            //     4: [card9, card9, card2, card2]
            // };
            // var round = new Round(players, playedCards);
            // assert.strictEqual(round.determineRoundHighest(), p2);

            // card3.isTrumpRank = true;
            // var playedCards = {1: [card1], 2: [card2], 3: [card3], 4: [card4]};
            // var round = new Round(players, playedCards);
            // assert.strictEqual(round.determineRoundHighest(), p3);

            // card1.isTrump = true;
            // card1.isTrumpSuit = true;
            // card2.isTrump = false;
            // card2.isTrumpSuit = false;
            // card3.isTrump = false;
            // card3.isTrumpSuit = false;
            // card4.isTrumpRank = true;
            // var playedCards = {1: [card1], 2: [card2], 3: [card3], 4: [card4]};
            // var round = new Round(players, playedCards);
            // assert.strictEqual(round.determineRoundHighest(), p4);
        })
    })
})

