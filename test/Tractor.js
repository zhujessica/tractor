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
})

