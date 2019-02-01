const { RankType, SuitType } = require('../CardEnum.js');
var Player = require('../Player.js');
var Card = require('../Card.js');
var Game = require('../Game.js');

var assert = require('chai').assert;

describe('Game', function() {
    describe('updatePoints', function() {
        it('correctly starts with 0 points', function() {
            var player1 = new Player(1, 'user1');
            var player2 = new Player(2, 'user2');
            var player3 = new Player(3, 'user3');
            var player4 = new Player(4, 'user4');
            var game = new Game([player1, player2, player3, player4]);
            assert.strictEqual(game.points, 0);
        })

        it('correctly updates points', function() {
            var player1 = new Player(1, 'user1');
            var player2 = new Player(2, 'user2');
            var player3 = new Player(3, 'user3');
            var player4 = new Player(4, 'user4');
            var game = new Game([player1, player2, player3, player4]);
            assert.strictEqual(game.points, 0);
            game.updatePoints(10);
            assert.strictEqual(game.points, 10);
            game.updatePoints(5);
            assert.strictEqual(game.points, 15);
        })
    })

    describe('getTotalPoints', function() {
        it('correctly works when banking team wins', function() {
            var player1 = new Player(1, 'user1');
            var player2 = new Player(2, 'user2');
            var player3 = new Player(3, 'user3');
            var player4 = new Player(4, 'user4');
            var game = new Game([player1, player2, player3, player4]);
            game.banker = player1;
            player1.banker = true;
            player1.vault = [new Card(RankType.TEN, SuitType.SPADES), new Card(RankType.TWO, SuitType.HEARTS)];
            game.points = 5;
            assert.strictEqual(game.getTotalPoints(player1, 2), 5);
            assert.strictEqual(game.getTotalPoints(player3, 2), 5);
        })

        it('correctly works when nonbanking team wins', function() {
            var player1 = new Player(1, 'user1');
            var player2 = new Player(2, 'user2');
            var player3 = new Player(3, 'user3');
            var player4 = new Player(4, 'user4');
            var game = new Game([player1, player2, player3, player4]);
            game.banker = player1;
            player1.banker = true;
            player1.vault = [new Card(RankType.TEN, SuitType.SPADES), new Card(RankType.TWO, SuitType.HEARTS)];
            game.points = 5;
            assert.strictEqual(game.getTotalPoints(player2, 1), 25);
            assert.strictEqual(game.getTotalPoints(player4, 2), 45);
        })
    })
    describe('finalizeTrump', function() {
        it('works in general case', function() {
            var player1 = new Player(1, 'user1');
            var player2 = new Player(2, 'user2');
            var player3 = new Player(3, 'user3');
            var player4 = new Player(4, 'user4');
            
            var card = new Card(RankType.TEN, SuitType.SPADES);
            var card2 = new Card(RankType.TWO, SuitType.HEARTS);
            var card3 = new Card(RankType.THREE, SuitType.DIAMONDS);
            var card4 = new Card(RankType.BIG, SuitType.JOKERS);
            player1.drawCard(card);
            player2.drawCard(card2);
            player3.drawCard(card3);
            player4.drawCard(card4);

            var game = new Game([player1, player2, player3, player4]);
            game.trumpSuit = SuitType.SPADES;
            game.trumpRank = RankType.TWO; 
            game.finalizeTrump();
            
            assert.deepEqual([card.isTrump, card.isTrumpRank, card.isTrumpSuit], [true, false, true]);
            assert.deepEqual([card2.isTrump, card2.isTrumpRank, card2.isTrumpSuit], [true, true, false]);
            assert.deepEqual([card3.isTrump, card3.isTrumpRank, card3.isTrumpSuit], [false, false, false]);
            assert.deepEqual([card4.isTrump, card4.isTrumpRank, card4.isTrumpSuit], [true, false, false]);
        })
    })
    describe('finalizeBanker', function() {
        it('works as expected', function() {
            var player1 = new Player(1, 'user1');
            var player2 = new Player(2, 'user2');
            var player3 = new Player(3, 'user3');
            var player4 = new Player(4, 'user4');

            player1.level = RankType.THREE;
            
            var game = new Game([player1, player2, player3, player4]);
            game.finalizeBanker(player1);
            assert.deepEqual([player1.banker, game.banker, game.trumpRank], [true, 1, RankType.THREE]);
            for (var i = 0; i < game.players.length; i++) {
                assert.strictEqual(game.players[i].trumpRank, RankType.THREE);
            } 
        })
    })
})
