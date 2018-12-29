var Player = require('./Player.js');
var Deck = require('./Deck.js');
var Game = require('./Game.js');

class Tractor {
    /**
     * 
     * @param {number} id ID of this game of tractor (for url)
     * @param {number} players The number of players in the game
     */
    constructor(id, players) {
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
        this.players.push(new Player(id, false, 2));
        return this.players[id - 1];
    }

    /**
     * @param {Player} player The player that was banker last game
     * @param {number} winningTeam 0 if team (2,4) won last game, otherwise 1
     * @param {number} pointsWon The number of points won in the last round by non-banking team
     */
    advanceGame(banker, winningTeam, pointsWon) {
        banker.banker = false;
        if (banker.id % 2 == winningTeam) {
            // banking team won
            levels = Math.floor((80 - pointsWon) / 40) + 1;
            banker.level += levels;
            this.getPartner(banker).level += levels;
            this.getPartner(banker).banker = true;
        } else {
            levels = Math.floor((pointsWon - 80) / 40);
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
        return this.players[(banker.id + 1) % 4];
    }
}

module.exports = Tractor;
