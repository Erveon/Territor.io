const World = require("../world/world");

module.exports = class Lobby {

    constructor(id) {
        this._id = id;
        this._world = new World(Math.random());
        this._players = [];
    }

    get maxPlayers() {
        return 20;
    }

    get id() {
        return this._id;
    }

    get players() {
        return this._players;
    }

    get world() {
        return this._world;
    }

    addPlayer(player) {
        this._players.push(player);
    }

    removePlayer(player) {
        this._players = _.without(this._players, player);
    }

}
