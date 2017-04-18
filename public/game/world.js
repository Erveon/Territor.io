var World = (function() {

	var chunks = [];
	var hoveringTerritory;
	var graphics;

	function create() {
		graphics = Game.getGame().add.graphics();
		graphics.lineStyle(1, 0x000000, 1);
		Game.getGame().world.setBounds(-9600, -6000, 19200, 12000);
	}

	function getGraphics() {
		return graphics;
	}

	function loadChunk(chunk) {
		chunk = new Chunk(this, chunk.coords, chunk.tiles);
		if(chunks[chunk.coords.x] === undefined) chunks[chunk.coords.x] = [];
		chunks[chunk.coords.x][chunk.coords.y] = chunk;
		chunk.draw();
		console.log("Loading chunk " + chunk.coords.x + ", " + chunk.coords.y);
	}

	function update() {
		var location = screenToGrid(Game.getGame().input.x, Game.getGame().input.y);

		/*var hovering = getTerritory(Math.floor(location.x / territorySize), Math.floor(location.y / territorySize));
		if(hoveringTerritory !== hovering) {
			if(hovering !== undefined) {
				if(hoveringTerritory)
					hoveringTerritory.onMouseLeave();
				hoveringTerritory = hovering;
				hoveringTerritory.onMouseEnter();
			} else {
				if(hoveringTerritory !== undefined)
					hoveringTerritory.onMouseLeave();
				hoveringTerritory = undefined;
			}
		}*/
		/*var tileText = location.x + ", " + location.y;
		this.text.text = "Screen: " + Game.getGame().input.x + ", " + Game.getGame().input.y + "\n"
		+ "Tile: " + tileText;*/
	}

	function screenToGrid(x, y) {
		var image = Game.getGame().cache.getFrameByName("tileset_forest", "terrain_floor.png");
		var camera = Game.getGame().camera;
		x = (camera.x + x) / camera.scale.x;
		y = (camera.y + y) / camera.scale.y;
	    var posX = Math.floor((x / (image.width / 2) + y / (image.height / 4)) / 2);
		var posY = Math.floor((y / (image.height / 4) - (x / (image.width / 2))) / 2);

		return {
			x: posX,
			y: posY
		};
	}

	function gridToWorld(x, y) {
		var image = Game.getGame().cache.getFrameByName("tileset_forest", "terrain_floor.png");
		return {
			x: (x - y) * image.width / 2,
			y: (x + y) * image.height / 4
		}
	}

	return {
		create: create,
		update: update,
		loadChunk: loadChunk,
		getGraphics: getGraphics,
		gridToWorld: gridToWorld
	}

})();
