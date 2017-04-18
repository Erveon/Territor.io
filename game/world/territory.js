module.exports = class Territory {

	static get size() {
		return 3;
	}

	constructor(chunk, x, y, tiles) {
		this._tiles = tiles;
		this._chunk = chunk;
		this._coords = { x: x, y: y };
		this._globalCoords = {
			x: chunk.size * chunk.coords.x + x,
			y: chunk.size * chunk.coords.y + y
		}
	}

	get coords() {
		return this._globalCoords;
	}

	get localCoords() {
		return this._coords;
	}

	get chunk() {
		return this._chunk;
	}

	get tiles() {
		return this._tiles;
	}

	get networkObject() {
		return {
			coords: this.coords,
			chunk: this.chunk.coords,
			localCoords: this.localCoords
		};
	}

}
