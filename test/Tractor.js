var Tractor = require('../Tractor.js')
const { RankType, SuitType } = require('../CardEnum.js');
var assert = require('assert');

describe('Tractor', function() {
    describe('init', function() {
        it('correctly intializes game of Tractor', function() {
            var tractor = new Tractor(1);
            assert.strictEqual(tractor.id, 1);
            assert.deepEqual(tractor.players, []);
        })
    })

    describe('addPlayer', function() {
        it('correctly adds a player', function() {
            var tractor = new Tractor(1);
            var player = tractor.addPlayer();
            assert.strictEqual(player.id, 1);
            assert.deepEqual(tractor.players, [player]);
        })
        it('caps players at 4', function() {
            var tractor = new Tractor(1);
            var players = [];
            for (var i = 1; i <= 4; i++) {
                var newPlayer = tractor.addPlayer();
                assert.strictEqual(newPlayer.id, i);
                players.push(newPlayer);
            }
            assert.deepEqual(tractor.players, players);
            assert.throws(tractor.addPlayer, "Game of tractor can only have 4 players");
        })
    })

    describe('getPartner', function() {
        it('correctly determines partner for each player', function() {
            var tractor = new Tractor(4);
            var p1 = tractor.addPlayer();
            var p2 = tractor.addPlayer();
            var p3 = tractor.addPlayer();
            var p4 = tractor.addPlayer();
            assert.deepEqual(tractor.getPartner(p1), p3);
            assert.deepEqual(tractor.getPartner(p3), p1);
            assert.deepEqual(tractor.getPartner(p2), p4);
            assert.deepEqual(tractor.getPartner(p4), p2);
        })
    })

    describe('advanceGame', function() {
        it('correctly advances game when banking team wins with 0 points', function() {
            var tractor = new Tractor(4);
            var p1 = tractor.addPlayer();
            var p2 = tractor.addPlayer();
            var p3 = tractor.addPlayer();
            var p4 = tractor.addPlayer();
            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 2);

            tractor.advanceGame(p1, 0);

            assert.strictEqual(p1.level, 5);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 5);
            assert.strictEqual(p4.level, 2);

            assert.strictEqual(p1.banker, false);
            assert.strictEqual(p3.banker, true);
        })

        it('correctly advances game when banking team wins with 20 points', function() {
            var tractor = new Tractor(4);
            var p1 = tractor.addPlayer();
            var p2 = tractor.addPlayer();
            var p3 = tractor.addPlayer();
            var p4 = tractor.addPlayer();
            p3.banker = true;
            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 2);

            tractor.advanceGame(p3, 20);

            assert.strictEqual(p1.level, 4);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 4);
            assert.strictEqual(p4.level, 2);

            assert.strictEqual(p3.banker, false);
            assert.strictEqual(p1.banker, true);
        })

        it('correctly advances game when banking team wins with 40 points', function() {
            var tractor = new Tractor(4);
            var p1 = tractor.addPlayer();
            var p2 = tractor.addPlayer();
            var p3 = tractor.addPlayer();
            var p4 = tractor.addPlayer();
            p4.banker = true;
            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 2);

            tractor.advanceGame(p4, 40);

            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 3);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 3);

            assert.strictEqual(p4.banker, false);
            assert.strictEqual(p2.banker, true);
        })

        it('correctly advances game when banking team wins with 60 points', function() {
            var tractor = new Tractor(4);
            var p1 = tractor.addPlayer();
            var p2 = tractor.addPlayer();
            var p3 = tractor.addPlayer();
            var p4 = tractor.addPlayer();
            p2.banker = true;
            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 2);

            tractor.advanceGame(p2, 60);

            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 3);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 3);

            assert.strictEqual(p2.banker, false);
            assert.strictEqual(p4.banker, true);
        })

        it('correctly advances game when nonbanking team wins with 80 points', function() {
            var tractor = new Tractor(4);
            var p1 = tractor.addPlayer();
            var p2 = tractor.addPlayer();
            var p3 = tractor.addPlayer();
            var p4 = tractor.addPlayer();
            p1.banker = true;
            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 2);

            tractor.advanceGame(p1, 80);

            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 2);

            assert.strictEqual(p1.banker, false);
            assert.strictEqual(p2.banker, true);
        })

        it('correctly advances game when nonbanking team wins with 120 points', function() {
            var tractor = new Tractor(4);
            var p1 = tractor.addPlayer();
            var p2 = tractor.addPlayer();
            var p3 = tractor.addPlayer();
            var p4 = tractor.addPlayer();
            p3.banker = true;
            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 2);

            tractor.advanceGame(p3, 120);

            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 3);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 3);

            assert.strictEqual(p3.banker, false);
            assert.strictEqual(p4.banker, true);
        })

        it('correctly advances game when nonbanking team wins with 140 points', function() {
            var tractor = new Tractor(4);
            var p1 = tractor.addPlayer();
            var p2 = tractor.addPlayer();
            var p3 = tractor.addPlayer();
            var p4 = tractor.addPlayer();
            p2.banker = true;
            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 2);

            tractor.advanceGame(p2, 140);

            assert.strictEqual(p1.level, 3);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 3);
            assert.strictEqual(p4.level, 2);

            assert.strictEqual(p2.banker, false);
            assert.strictEqual(p3.banker, true);
        })

        it('correctly advances game when nonbanking team wins with 160 points', function() {
            var tractor = new Tractor(4);
            var p1 = tractor.addPlayer();
            var p2 = tractor.addPlayer();
            var p3 = tractor.addPlayer();
            var p4 = tractor.addPlayer();
            p4.banker = true;
            assert.strictEqual(p1.level, 2);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 2);
            assert.strictEqual(p4.level, 2);

            tractor.advanceGame(p4, 160);

            assert.strictEqual(p1.level, 4);
            assert.strictEqual(p2.level, 2);
            assert.strictEqual(p3.level, 4);
            assert.strictEqual(p4.level, 2);

            assert.strictEqual(p4.banker, false);
            assert.strictEqual(p1.banker, true);
        })
    })
})

