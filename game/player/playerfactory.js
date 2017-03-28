const Player = require("./player");

module.exports = class PlayerFactory {

	constructor() {
		this.players = [];
	}

	createPlayer(connection) {
		let player = new Player(connection);
		this.players[connection.id] = player;
	}

	getPlayer(connection) {
		return this.players[connection.id];
	}

	removePlayer(connectionid) {
		this.players[connectionid] = undefined;
	}

}
