const Tile = require("./tile");
const Territory = require("./territory");

module.exports = class Chunk {

	static get size() {
		return 10;
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

	get world() {
		return this._world;
	}

	get networkObject() {
		let territories = this.territories.map(set => set.map(t => t.networkObject));
		return {
			territories: territories,
			coords: this.coords
		};
	}

	getLocalTile(x, y) {
		if(this.tiles[x] === undefined || this.tiles[x][y] === undefined)
			return undefined;
		return this.tiles[x][y];
	}

	geTile(x, y) {
		return this.world.getTile(x, y);
	}

    generate() {
		this.generateChunk();
		this.generateWater();
		this.assignTileSprites();
    }

	assignTileSprites() {
		for(let x = 0; x < this.territories.length; x++) {
			let territoryset = this.territories[x];
			for(let y = 0; y < territoryset.length; y++) {
				let territory = this.territories[x][y];
				territory.forTiles(tile => tile.sprite = this.getTileSprite(tile.coords.x, tile.coords.y));
			}
		}
	}

	get tileOffset() {
		return {
			x: this.coords.x * this.size * Territory.size,
			y: this.coords.y * this.size * Territory.size,
		}
	}

	generateChunk() {
		for(let x = 0; x < Chunk.size; x++) {
			this.territories[x] = [];
			for(let y = 0; y < Chunk.size; y++) {
				this.territories[x][y] = this.generateTerritory(x, y);
			}
		}
	}

	generateTerritory(terX, terY) {
		let terCoords = { x: terX, y: terY };
		let terTiles = [];
		for(let x = 0; x < Territory.size; x++) {
			terTiles[x] = [];
			for(let y = 0; y < Territory.size; y++) {
				terTiles[x][y] = this.generateTile(terCoords, x, y);
			}
		}
		return new Territory(this, terCoords, terTiles);
	}

	generateTile(terCoords, x, y) {
		let coords = {
			x: this.tileOffset.x + (terCoords.x * Territory.size) + x,
			y: this.tileOffset.y + (terCoords.y * Territory.size) + y,
		}
		return new Tile(coords, Tile.Type.GRASS);
	}

	generateWater() {
		for(let i = 0; i < this.territories.length; i++) {
			let territoryset = this.territories[i];
			for(let j = 0; j < territoryset.length; j++) {
				let territory = territoryset[j];
				let val = this.world.simplex.noise2D(territory.coords.x / 10, territory.coords.y / 10);
				if(val > 0.4) {
					territory.tiles.forEach(tileset => {
						tileset.forEach(tile => {
							tile.type = Tile.Type.WATER;
						});
					});
				}
			}
		}
	}

	getTileSprite(x, y) {
		if(this.world.isWater(x, y)) {
			let topRight = this.world.isWater(x, y - 1), topLeft = this.world.isWater(x - 1, y),
				botLeft = this.world.isWater(x, y + 1), botRight = this.world.isWater(x + 1, y),
				right = this.world.isWater(x + 1, y - 1), left = this.world.isWater(x - 1, y + 1),
				top = this.world.isWater(x - 1, y - 1), bot = this.world.isWater(x + 1, y + 1);
			if(!topRight) {
				if(!topLeft) return 'water_topin';
				else if(!botRight) return 'water_rightin';
				else return 'water_topright';
			} else if(!botLeft) {
				if(!botRight) return 'water_botin';
				else if(!topLeft) return 'water_leftin';
				else return 'water_botleft';
			} else if(!topLeft) return 'water_topleft';
			else if(!botRight) return 'water_botright';
			else if(!right) return 'water_rightout';
			else if(!left) return 'water_leftout';
			else if(!top) return 'water_topout';
			else if(!bot) return 'water_botout';
			else return 'water_main';
		}
		return 'terrain_floor';
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
