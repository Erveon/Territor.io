const Lobby = require("./lobby");

module.exports = class LobbyFactory {

	constructor() {
		this._listeners = [];
		this._lobbies = [];
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
		this._lobbies[id] = lobby;
		this._listeners.forEach(l => l.onLobbyCreated(lobby));
		return lobby;
	}

	removeLobby(id) {
		let lobby = getLobby(id);
		if(lobby) {
			this._lobbies = _.without(this._lobbies, getLobby(id));
			this._listeners.forEach(l => l.onLobbyRemoved(id));
		}
	}

	findLobby(callback) {
		var lobby;
		this._lobbies.forEach(l => {
			if(l.players.length < l.maxPlayers) {
				lobby = l;
				return;
			}
		});
		if(lobby === undefined)
			lobby = this.createLobby();
		return lobby;
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

	get count() {
		return this._lobbies.length;
	}

}
