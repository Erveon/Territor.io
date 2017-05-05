module.exports = class Player {

    constructor(game, connection) {
        this._game = game;
        this._conn = connection;
        this._name = "Unknown";
        this.addListeners();
    }

    addListeners() {
        const self = this;
        this.conn.on('set username', data => {
            self.name = data.username;
        });
        this.conn.on('find lobby', data => {
            self.findLobby();
            self.spawn();
        });
        this.conn.on('need chunk', data => {
            if(self.lobby) {
                let chunk = self.lobby.world.getChunk(data.x, data.y);
                if(chunk) {
                    self.conn.emit('chunk', chunk.networkObject);
                }
            }
        });
        this.conn.on('disconnect', data => {
            this._game.players.removePlayer(self);
        });
    }

	disconnect() {
		if(this.lobby) this.lobby.removePlayer(this);
	}

    findLobby() {
        let lobby = this._game.lobbies.findLobby();
        lobby.addPlayer(this);
        this.lobby = lobby;
        this.conn.emit('lobby info', lobby.info);
    }

    /**
    * Finds a territory to spawn the player in,
    * loads the nearby chunks and puts the player there
    **/
    spawn() {
        const self = this;
        let territory = this.lobby.world.findSpawn();
		territory.owner = this.name;
        self.conn.emit('chunk', territory.chunk.networkObject);
        territory.chunk.neighbours.forEach(networkChunk => {
            self.conn.emit('chunk', networkChunk);
        });
        self.conn.emit('spawn', { territory: territory.networkObject });
    }

    get lobby() {
        return this._lobby;
    }

    set lobby(lobby) {
        this._lobby = lobby;
    }

    get conn() {
        return this._conn;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

	get look() {
		return this._look || "default";
	}

	set look(look) {
		this._look = look;
	}

}
