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
        });
        this.conn.on('send chunk', data => {
            if(self.lobby) {
                let chunk = self.lobby.world.getChunk(data.x, data.y);
                if(chunk) {
                    self.conn.emit('receive chunk', { chunk: chunk.networkObject });
                }
            }
        });
        this.conn.on('disconnect', data => {
            this._game.players.removePlayer(self);
        });
    }

    findLobby() {
        let lobby = this._game.lobbies.findLobby();
        lobby.addPlayer(this);
        this.lobby = lobby;
    }

    get lobby() {
        return this._lobby;
    }

    set lobby(lobby) {
        this._lobby = lobby;
        this.conn.emit('found lobby', { id: lobby.id });
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

}
