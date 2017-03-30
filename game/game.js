const LobbyFactory = require("./lobby/lobbyfactory");
const PlayerFactory = require("./player/playerfactory");
const ConnectionFactory = require("./sockets/connectionfactory");

module.exports = class Game {

	constructor(io) {
		this._lobbies = new LobbyFactory(this);
		this._players = new PlayerFactory(this);
		this._connections = new ConnectionFactory(this, io);
	}

	get lobbies() {
		return this._lobbies;
	}

	get players() {
		return this._players;
	}

	get connections() {
		return this._connections;
	}

}
