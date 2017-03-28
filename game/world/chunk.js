const Tile = require("./tile");
const Territory = require("./territory");

module.exports = class Chunk {

	static get size() {
		return 60;
	}

    constructor(world, x, y) {
        this._coords = { x: x, y: y };
        this._tiles = [];
		this._territories = [];
        this._world = world;
		this.generate();
    }

	get size() {
		return Chunk.size;
	}

    generate() {
        for(let x = 0; x < Chunk.size; x++) {
			this._tiles[x] = [];
			for(let y = 0; y < Chunk.size; y++) {
				let tile = new Tile(this, x, y, Tile.Type.GRASS);
				this._tiles[x][y] = tile;
			}
		}
		this.generateWater();
		this.generateTerritories();
    }

	generateWater() {
		this._tiles.forEach(tileset => {
			tileset.forEach(tile => {
				let val = this._world.simplex.noise2D(tile.coords.x / 10, tile.coords.y / 10);
				if(val > 0.4) {
					tile.type = Tile.Type.WATER;
				}
			});
		});
	}

	generateTerritories() {
		for(let x = 0; x < Chunk.size; x += Territory.size) {
			let coordX = x / Territory.size;
			this._territories[coordX] = [];
			for(let y = 0; y < Chunk.size; y += Territory.size) {
				let coordY = y / Territory.size;
				let territory = new Territory(this, coordX, coordY);
				this._territories[coordX][coordY] = territory;
			}
		}
	}

	get coords() {
		return this._coords;
	}

	get territories() {
		return this._territories;
	}

}
