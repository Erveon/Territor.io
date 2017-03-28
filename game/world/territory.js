module.exports = class Territory {

	static get size() {
		return 3;
	}

	constructor(chunk, x, y) {
		this._chunk = chunk;
		this._coords = { x: x, y: y };
		this._globalCoords = {
			x: chunk.chunkSize * chunk.coords.x + x,
			y: chunk.chunkSize * chunk.coords.y + y
		}
	}

	get coords() {
		return this._globalCoords;
	}

}
