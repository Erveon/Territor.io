var World = require("../world/world");

export class Lobby {

    constructor(id) {
        this.id = id;
        this.world = new World(Math.random());
        this.players = [];
    }

    get id() {
        return this.id;
    }

    get players() {
        return this.players;
    }

    get world() {
        return this.world;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players = _.without(this.players, player);
    }

}
