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
            var round = new Round(players, p1, {});
            assert.deepEqual(round.players, players);
            assert.strictEqual(round.startingPlayer, p1);
            assert.strictEqual(round.totalPoints, 0);
            assert.deepEqual(round.playedCards, {});
        })
    })
    describe('playCards', function() {
        it('correctly adds cards played by first player', function() {
            var p1 = new Player(1, true, 2);
            var p2 = new Player(2, false, 2);
            var p3 = new Player(3, false, 2);
            var p4 = new Player(4, false, 2);
            var players = [p1, p2, p3, p4];
            var round = new Round(players, p1, {});
            var king = new Card(RankType.KING, SuitType.SPADES);
            round.playCards(p1, [king]);
            assert.strictEqual(round.totalPoints, 10);
            assert.deepEqual(round.playedCards, {1: [king]});
        })

        it('correctly adds cards played by many players', function() {
            var p1 = new Player(1, true, 2);
            var p2 = new Player(2, false, 2);
            var p3 = new Player(3, false, 2);
            var p4 = new Player(4, false, 2);
            var players = [p1, p2, p3, p4];
            var round = new Round(players, p1, {});
            var king = new Card(RankType.KING, SuitType.SPADES);
            var five = new Card(RankType.FIVE, SuitType.SPADES);
            var three = new Card(RankType.THREE, SuitType.SPADES);
            round.playCards(p1, [king]);
            assert.strictEqual(round.totalPoints, 10);
            assert.deepEqual(round.playedCards, {1: [king]});
            round.playCards(p2, [three]);
            assert.strictEqual(round.totalPoints, 10);
            assert.deepEqual(round.playedCards, {1: [king], 2: [three]});
            round.playCards(p3, [five]);
            assert.strictEqual(round.totalPoints, 15);
            assert.deepEqual(round.playedCards, {1: [king], 2: [three], 3: [five]});
        })
    })
})

