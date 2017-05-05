const Game = require('../game');

module.exports = class ConnectionFactory {

	constructor(game, io) {
		this.game = game;
		this.io = io;
		this.register();
	}

	register() {
		const self = this;
		this.io.on('connection', function(socket) {
			self.game.players.createPlayer(socket);
			socket.on('disconnect', function(data) {
				self.game.players.removePlayer(socket);
			});
		});
	}

}
