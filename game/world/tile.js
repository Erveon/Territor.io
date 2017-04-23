module.exports = class Tile {

	static get Type() {
		return {
			GRASS: 0,
		    WATER: 1
		}
	}

	constructor(coords, tiletype) {
		this._coords = coords;
		this._type = tiletype;
	}

	get coords() {
		return this._coords;
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

	get networkObject() {
		return {
			coords: this.coords,
			type: this.type,
			sprite: this.sprite
		}
	}

}
