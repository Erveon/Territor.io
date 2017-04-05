const LobbyFactory = require("./lobby/lobbyfactory");
const PlayerFactory = require("./player/playerfactory");
const ConnectionFactory = require("./sockets/connectionfactory");

let game;

const GameInstance = class GameInstance {

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

};

const create = (io) => {
	this.game = new GameInstance(io);
}

const get = () => {
	return this.game;
}

module.exports = {
	create: create,
	get: get
}
