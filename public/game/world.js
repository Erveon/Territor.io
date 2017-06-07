var World = (function() {

	var group;
	var chunks = [];
	var hoveringTerritory;
	var graphics;

	function create() {
		group = Game.getGame().add.group();
		graphics = Game.getGame().add.graphics();
		graphics.lineStyle(1, 0x000000, 1);
		Game.getGame().world.setBounds(-9600, -6000, 19200, 12000);
	}

	function getGraphics() {
		return graphics;
	}

	function loadChunk(chunk) {
		chunk = new Chunk(chunk.coords, chunk.territories, group);
		if(chunks[chunk.coords.x] === undefined) chunks[chunk.coords.x] = [];
		chunks[chunk.coords.x][chunk.coords.y] = chunk;
		for(var x in chunks) {
			for(var y in chunks[x]) {
				var c = chunks[x][y];
				c.getGroup().z = c.coords.y * chunks.length + c.coords.x;
			}
		}
		group.sort('z', Phaser.Group.SORT_ASCENDING);
		chunk.draw();
	}

	function getChunk(x, y) {
		if(chunks[x] === undefined || chunks[x][y] === undefined)
			return undefined;
		return chunks[x][y];
	}

	function update() {
		if(Lobby.isLoaded()) {
			var hovering = undefined;
			var location = screenToGrid(Game.getGame().input.x, Game.getGame().input.y);
			var chunkTiles = (Lobby.getInfo().chunkSize * Lobby.getInfo().territorySize);
			var chunk = getChunk(Math.floor(location.x / chunkTiles), Math.floor(location.y / chunkTiles));

			if(chunk !== undefined) {
				hovering = chunk.getTerritoryByTile(location.x, location.y);
			}

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
			}
			/*var tileText = location.x + ", " + location.y;
			this.text.text = "Screen: " + Game.getGame().input.x + ", " + Game.getGame().input.y + "\n"
			+ "Tile: " + tileText;*/
		}
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
		gridToWorld: gridToWorld,
		getChunk: getChunk
	}

})();
