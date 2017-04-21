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

	get world() {
		return this._world;
	}

	get networkObject() {
		return {
			tiles: this.tiles,
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
		this.generateTiles();
		this.generateTerritories();
		this.generateWater();
		this.assignTileSprites();
    }

	assignTileSprites() {
		for(let x = 0; x < this.tiles.length; x++) {
			let tileset = this.tiles[x];
			for(let y = 0; y < tileset.length; y++) {
				let tile = this.tiles[x][y];
				tile.sprite = this.getTileSprite(tile.coords.x, tile.coords.y);
			}
		}
	}

	generateTiles() {
        for(let x = 0; x < Chunk.size; x++) {
			this.tiles[x] = [];
			for(let y = 0; y < Chunk.size; y++) {
				let tile = new Tile(this, x, y, Tile.Type.GRASS);
				this.tiles[x][y] = tile;
			}
		}
	}

	generateWater() {
		for(let i = 0; i < this.territories.length; i++) {
			let territoryset = this.territories[i];
			for(let j = 0; j < territoryset.length; j++) {
				let territory = territoryset[j];
				let val = this.world.simplex.noise2D(territory.coords.x / 10, territory.coords.y / 10);
				if(val > 0.4) {
					for(let k = 0; k < territory.tiles.length; k++) {
						let tile = territory.tiles[k];
						tile.type = Tile.Type.WATER;
					}
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
