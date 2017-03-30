module.exports = class Player {

    constructor(connection) {
		console.log("Player created");
        this.conn = connection;
    }

    get connection() {
        return this.connection;
    }

    get name() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

}
