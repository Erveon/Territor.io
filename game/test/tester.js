const Game = require("../game");
const Chunk = require("../world/chunk");

module.exports = class Tester {

	constructor() { }

	run() {
		const game = new Game();
		game.lobbies.addListener(this);
		game.lobbies.createLobby();
	}

	onLobbyCreated(lobby) {
		console.log("Lobby " + lobby.id + " has been created.");
		console.log("World seed: " + lobby.world.seed);
		let chunks = lobby.world.chunks;
		console.log("Chunk amount: " + chunks.length * chunks[0].length);
		console.log("Chunk size: " + Chunk.size + "x" + Chunk.size);
		let territories = lobby.world.getChunk(0, 0).territories;
		console.log("Territories per chunk: " + territories.length * territories[0].length);
	}

	onLobbyRemoved(lobbyid) {
		console.log("Lobby " + lobbyid + " has been removed.");
	}

}
