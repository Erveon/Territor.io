const LobbyFactory = require("./lobby/lobbyfactory");
const PlayerFactory = require("./player/playerfactory");

module.exports = class Game {

	constructor() {
		this._lobbies = new LobbyFactory();
		this._players = new PlayerFactory();
	}

	get lobbies() {
		return this._lobbies;
	}

	get players() {
		return this._players;
	}

}
