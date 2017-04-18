const Chunk = require("./chunk");
const Alea = require('alea'); //PRNG to allow seeding
const SimplexNoise = require("simplex-noise");

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

    generate() {
        for(let x = 0; x < World.size; x++) {
			this._chunks[x] = [];
			for(let y = 0; y < World.size; y++) {
				let chunk = new Chunk(this, x, y);
				this._chunks[x][y] = chunk;
			}
		}
    }

	getChunk(x, y) {
		if(this._chunks[x] === undefined || this._chunks[x][y] === undefined)
			return undefined;
		return this._chunks[x][y];
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
