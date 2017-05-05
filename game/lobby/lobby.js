const World = require("../world/world");
const _ = require("underscore");

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

	get networkPlayers() {
		return this._players.map(p => {
			return {
				name: p.name,
				look: p.look
			}
		});
	}

    get info() {
        return {
            "worldSize": World.size,
            "chunkSize": this.world.chunkSize,
            "territorySize": this.world.territorySize,
			"players": this.networkPlayers
        }
    }

    addPlayer(player) {
        this._players.push(player);
		console.log("(" + this.id + ") " + player.conn.id + " connected. " + this.players.length + " in lobby.");
    }

    removePlayer(player) {
        this._players = _.without(this._players, player);
		console.log("(" + this.id + ") " + player.conn.id + " disconnected. " + this.players.length + " in lobby.");
    }

}
