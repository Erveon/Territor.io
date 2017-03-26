export class Player {

    constructor(connection) {
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
