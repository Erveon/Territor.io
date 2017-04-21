module.exports = class Tile {

	static get Type() {
		return {
			GRASS: 0,
		    WATER: 1
		}
	}

	constructor(chunk, x, y, tiletype) {
		this._chunkCoords = { x: x, y: y };
		this._coords = { x: x + (chunk.coords.x * chunk.size), y: y + (chunk.coords.y * chunk.size)};
		this._type = tiletype;
	}

	get coords() {
		return this._coords;
	}

	get chunkCoords() {
		return this._chunkCoords;
	}

	get type() {
		return this._type;
	}

	get sprite() {
		return this._sprite;
	}

	set type(type) {
		this._type = type;
	}

	set sprite(sprite) {
		this._sprite = sprite;
	}

}
