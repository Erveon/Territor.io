const Lobby = require("./lobby");

module.exports = class LobbyFactory {

	constructor() {
		this._listeners = [];
		this._lobbies = []
	}

	createLobby() {
		let found = false;
		let id = 0;
		while(!found) {
			if(this._lobbies[id] === undefined)
				found = true;
			else id++;
		}
		let lobby = new Lobby(id);
		this._lobbies.push(lobby);
		this._listeners.forEach(l => l.onLobbyCreated(lobby));
	}

	removeLobby(id) {
		let lobby = getLobby(id);
		if(lobby) {
			this._lobbies = _.without(this._lobbies, getLobby(id));
			this._listeners.forEach(l => l.onLobbyRemoved(id));
		}
	}

	getLobby(id) {
		return this._lobbies[id];
	}

	addListener(listener) {
		this._listeners.push(listener);
	}

	removeListener(listener) {
		this._listeners = _.without(this._listeners, listener);
	}

}
