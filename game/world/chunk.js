const Tile = require("./tile");
const Territory = require("./territory");

module.exports = class Chunk {

	static get size() {
		return 30;
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

	get tiles() {
		return this._tiles;
	}

	get networkObject() {
		return {
			tiles: this.tiles,
			coords: this.coords
		};
	}

    generate() {
        for(let x = 0; x < Chunk.size; x++) {
			this._tiles[x] = [];
			for(let y = 0; y < Chunk.size; y++) {
				let tile = new Tile(this, x, y, Tile.Type.GRASS);
				this._tiles[x][y] = tile;
			}
		}
		this.generateTerritories();
		this.generateWater();
    }

	generateWater() {
		this.territories.forEach(territoryset => {
			territoryset.forEach(territory => {
				let val = this._world.simplex.noise2D(territory.coords.x / 10, territory.coords.y / 10);
				if(val > 0.4) {
					territory.tiles.forEach(tile => tile.type = Tile.Type.WATER);
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
				let terTiles = [];
				for(let terX = x; terX < (x + Territory.size); terX++) {
					for(let terY = y; terY < (y + Territory.size); terY++) {
						terTiles.push(this.tiles[terX][terY]);
					}
				}
				let territory = new Territory(this, coordX, coordY, terTiles);
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

	get randomTerritory() {
		let x = Math.floor(Math.random() * this.territories.length);
		let y = Math.floor(Math.random() * this.territories[x].length);
		return this.territories[x][y];
	}

	get neighbours() {
		let chunks = [];
		for(let x = -1; x <= 1; x++) {
			for(let y = -1; y <= 1; y++) {
				if(x === 0 && y === 0) continue;
				let chunk = this._world.getChunk(this.coords.x + x, this.coords.y + y);
				if(chunk !== undefined) {
					chunks.push(chunk.networkObject);
				}
			}
		}
		return chunks;
	}

}
