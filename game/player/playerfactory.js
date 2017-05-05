const Player = require("./player");

module.exports = class PlayerFactory {

	constructor(game) {
		this._game = game;
		this._players = [];
	}

	createPlayer(connection) {
		let player = new Player(this._game, connection);
		this._players[connection.id] = player;
	}

	getPlayer(connection) {
		return this._players[connection.id];
	}

	removePlayer(connection) {
		if(this._players[connection.id]) {
			this._players[connection.id].disconnect();
			delete this._players[connection.id];
		}
	}

	get count() {
		return Object.keys(this._players).length;
	}

}
