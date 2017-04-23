const Chunk = require("./chunk");
const Alea = require('alea'); //PRNG to allow seeding
const SimplexNoise = require("simplex-noise");
const Territory = require("./territory");

module.exports = class World {

	static get size() {
		return 3;
	}

    constructor(seed) {
		this._seed = seed;
        this._chunks = [];
		this._simplex = new SimplexNoise(new Alea(this._seed));
		this.generate();
    }

	get simplex() {
		return this._simplex;
	}

	get seed() {
		return this._seed;
	}

	get chunks() {
		return this._chunks;
	}

	get chunkSize() {
		return Chunk.size;
	}

	get territorySize() {
		return Territory.size;
	}

    generate() {
        for(let x = 0; x < World.size; x++) {
			this._chunks[x] = [];
			for(let y = 0; y < World.size; y++) {
				let chunk = new Chunk(this, x, y);
				this._chunks[x][y] = chunk;
			}
		}
    }

	getChunk(coords) {
		return this.getChunk(coords.x, coords.y);
	}

	getChunk(x, y) {
		if(this._chunks[x] === undefined || this._chunks[x][y] === undefined)
			return undefined;
		return this._chunks[x][y];
	}

	getTile(x, y) {
		let chunkX = Math.floor(x / Chunk.size), chunkY = Math.floor(y / Chunk.size);
		let localX = x % Chunk.size, localY = y % Chunk.size;
		let chunk = this.getChunk(chunkX, chunkY);
		if(chunk === undefined) return undefined;
		return chunk.getLocalTile(localX, localY);
	}

	isWater(tile) {
		if(tile === undefined) return false;
		let terrX = Math.floor(tile.coords.x / Territory.size),
			terrY = Math.floor(tile.coords.y / Territory.size);
		let noise = this.simplex.noise2D(terrX / 10, terrY / 10);
		return noise > 0.4;
	}

	isWater(x, y) {
		let terrX = Math.floor(x / Territory.size),
			terrY = Math.floor(y / Territory.size);
		let noise = this.simplex.noise2D(terrX / 10, terrY / 10);
		return noise > 0.4;
	}

	get randomChunk() {
		let x = Math.floor(Math.random() * this.chunks.length);
		let y = Math.floor(Math.random() * this.chunks[x].length);
		return this.chunks[x][y];
	}

	findSpawn() {
		return this.randomChunk.randomTerritory;
	}

}
