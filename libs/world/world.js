const Chunk = require("./chunk");

export class World {

    constructor(seed) {
        this.chunks = [];
    }

    generate() {
        for(var x = 0; x < worldSize; x++) {
			this.tiles[x] = [];
			for(var y = 0; y < worldSize; y++) {
				var tile = {};
				tile.tileType = TileType.GRASS;
				tile.coords = { x: x, y: y };
				this.tiles[x][y] = tile;
			}
		}
    }

}
