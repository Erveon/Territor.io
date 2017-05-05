module.exports = class Territory {

	static get size() {
		return 3;
	}

	constructor(chunk, coords, tiles) {
		this._tiles = tiles;
		this._chunk = chunk;
		this._coords = coords;
	}

	get coords() {
		return this._coords;
	}

	get chunk() {
		return this._chunk;
	}

	get tiles() {
		return this._tiles;
	}

	get owner() {
		return this._owner;
	}

	set owner(owner) {
		this._owner = owner;
	}

	set diceCount(count) {
		this._diceCount = count;
	}

	get diceCount() {
		return this._diceCount || 0;
	}

	forTiles(func) {
		for(var x = 0; x < this.tiles.length; x++) {
			for(var y = 0; y < this.tiles[x].length; y++) {
				func(this.tiles[x][y]);
			}
		}
	}

	get networkObject() {
		let tiles = this.tiles.map(set => set.map(t => t.networkObject));
		return {
			tiles: tiles,
			chunk: this.chunk.coords,
			coords: this.coords,
			localCoords: this.coords,
			owner: this.owner,
			diceCount: this.diceCount
		}
	}

}
