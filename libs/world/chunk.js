const TileType = {
    GRASS: 0,
    WATER: 1
}

const chunkSize = 60;

export class Chunk {

    constructor(x, y, seed) {
        this.x = x; this.y = y;
        this.tiles = [];
        this.seed = seed;
    }

    generate() {
        for(var x = 0; x < chunkSize; x++) {
			this.tiles[x] = [];
			for(var y = 0; y < chunkSize; y++) {
				var tile = {};
				tile.tileType = TileType.GRASS;
				tile.coords = { x: x, y: y };
				this.tiles[x][y] = tile;
			}
		}
    }

}
