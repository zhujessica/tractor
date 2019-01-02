var Player = require('./Player.js');
var Deck = require('./Deck.js');
var Game = require('./Game.js');

class Tractor {
    /**
     * 
     * @param {number} id ID of this game of tractor (for url)
     */
    constructor(id) {
        this.id = id;
        this.players = []; // IDs starting at 1, no banker, no cards, all level 2

    }

    /**
     * Adds a player to the game. 
     * @return {Player} the player that was added. 
     */
    addPlayer() {
        if (this.players.length == 4) {
            throw new Error("Game of tractor can only have 4 players");
        }
        var id = this.players.length + 1;
        this.players.push(new Player(id));
        return this.players[id - 1];
    }

    /**
     * @param {Player} player The player that was banker last game
     * @param {number} pointsWon The number of points won in the last round by non-banking team
     */
    advanceGame(banker, pointsWon) {
        var winningTeam = 0; // 0 if team (2,4) won, else 1
        if (pointsWon >= 80 && banker.id % 2 == 0) {
            winningTeam = 1;
        } else if (pointsWon < 80 && banker.id % 2 == 1) {
            winningTeam = 1;
        }
        banker.banker = false;
        if (banker.id % 2 == winningTeam) {
            // banking team won
            var levels = Math.floor((80 - pointsWon) / 40) + 1;
            if (pointsWon == 40) {
                levels = 1;
            }
            banker.level += levels;
            this.getPartner(banker).level += levels;
            this.getPartner(banker).banker = true;
        } else {
            var levels = Math.floor((pointsWon - 80) / 40);
            var newBanker = this.players[banker.id % 4];
            newBanker.banker = true;
            newBanker.level += levels;
            this.getPartner(newBanker).level += levels;
        }
    }

    /**
     * @param {Player} player The player to get the partner of
     * @return {Player} the partner of the player
     */
    getPartner(player) {
        return this.players[(player.id + 1) % 4];
    }
}

module.exports = Tractor;
