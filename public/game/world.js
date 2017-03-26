var World = (function() {

	var TileType = {
		GRASS: 0,
		WATER: 1
	}

	var worldSize = 60;
	var tiles = [];
	var territories = [];
	var water = [];

	var hoveringTerritory = undefined;

	var territorySize = 3;

	var graphics;

	function create() {
		graphics = Game.getGame().add.graphics();
		graphics.lineStyle(1, 0x000000, 1);
		Game.getGame().world.setBounds(-9600, -6000, 19200, 12000);
		generateWorld();
		generateTerritories();
		generateWater();
		drawWorld();
		generateFoliage();

		this.text = Game.getGame().add.text(10, 10, "Testing", { "fill": "#fff"});
		this.text.fixedToCamera = true;
	}

	function getGraphics() {
		return graphics;
	}

	var done = false;

	function update() {
		var location = screenToGrid(Game.getGame().input.x, Game.getGame().input.y);

		var hovering = getTerritory(Math.floor(location.x / territorySize), Math.floor(location.y / territorySize));
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
		var tileText = location.x + ", " + location.y;
		this.text.text = "Screen: " + Game.getGame().input.x + ", " + Game.getGame().input.y + "\n"
		+ "Tile: " + tileText;
	}

	function generateWorld(game) {
		var image = Game.getGame().cache.getFrameByName("tileset_forest", "terrain_floor.png");

		for(var x = 0; x < worldSize; x++) {
			tiles[x] = [];
			for(var y = 0; y < worldSize; y++) {
				var tile = {};
				tile.tileType = TileType.GRASS;
				tile.coords = { x: x, y: y };
				tiles[x][y] = tile;
			}
		}
	}

	function generateWater() {
		noise.seed(Math.random());
		forAll(territories, function(territory) {
			var val = noise.simplex2(territory.coords.x / 10, territory.coords.y / 10);
			if(val > 0.4) {
				territory.forAllTiles(function(tile) {
					tile.tileType = TileType.WATER;
				});
			}
		});
	}

	function drawWorld() {
		forAll(tiles, function(tile) {
			if(tile.tileType === TileType.GRASS) {
				tile = drawTile(tile, 'tileset_forest', 'terrain_floor.png');
			} else if(tile.tileType === TileType.WATER) {
				var topRight = getTile(tile.coords.x, tile.coords.y - 1);
				var topLeft = getTile(tile.coords.x - 1, tile.coords.y);
				var botLeft = getTile(tile.coords.x, tile.coords.y + 1);
				var botRight = getTile(tile.coords.x + 1, tile.coords.y);
				var right = getTile(tile.coords.x + 1, tile.coords.y - 1);
				var left = getTile(tile.coords.x - 1, tile.coords.y + 1);
				var top = getTile(tile.coords.x - 1, tile.coords.y - 1);
				var bot = getTile(tile.coords.x + 1, tile.coords.y + 1);
				if(topRight === undefined || topRight.tileType === TileType.GRASS) {
					if(topLeft === undefined || topLeft.tileType === TileType.GRASS) {
						tile = drawTile(tile, 'tileset_forest', 'water_topin.png');
					} else if(botRight === undefined || botRight.tileType === TileType.GRASS) {
						tile = drawTile(tile, 'tileset_forest', 'water_rightin.png');
					} else {
						tile = drawTile(tile, 'tileset_forest', 'water_topright.png');
					}
				} else if(botLeft === undefined || botLeft.tileType === TileType.GRASS) {
					if(botRight === undefined || botRight.tileType === TileType.GRASS) {
						tile = drawTile(tile, 'tileset_forest', 'water_botin.png');
					} else if(topLeft === undefined || topLeft.tileType === TileType.GRASS) {
						tile = drawTile(tile, 'tileset_forest', 'water_leftin.png');
					} else {
						tile = drawTile(tile, 'tileset_forest', 'water_botleft.png');
					}
				} else if(topLeft === undefined || topLeft.tileType === TileType.GRASS) {
					tile = drawTile(tile, 'tileset_forest', 'water_topleft.png');
				} else if(botRight === undefined || botRight.tileType === TileType.GRASS) {
					tile = drawTile(tile, 'tileset_forest', 'water_botright.png');
				} else if(right === undefined || right.tileType === TileType.GRASS) {
					tile = drawTile(tile, 'tileset_forest', 'water_rightout.png');
				} else if(left === undefined || left.tileType === TileType.GRASS) {
					tile = drawTile(tile, 'tileset_forest', 'water_leftout.png');
				} else if(top === undefined || top.tileType === TileType.GRASS) {
					tile = drawTile(tile, 'tileset_forest', 'water_topout.png');
				}  else if(bot === undefined || bot.tileType === TileType.GRASS) {
					tile = drawTile(tile, 'tileset_forest', 'water_botout.png');
				} else {
					tile = drawTile(tile, 'tileset_forest', 'water_main.png');
				}
			}
			tile.anchor.set(0.5, 0);
			//Game.getGame().add.text(tile.x - 16, tile.y, tile.coords.x + ", " + tile.coords.y);
			tiles[tile.coords.x][tile.coords.y] = tile;
		});
	}

	function drawTile(tile, tileset, sprite) {
		var position = gridToWorld(tile.coords.x, tile.coords.y);
		return $.extend(Game.getGame().add.sprite(position.x, position.y, tileset, sprite), tile);
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

	function forAll(col, func) {
		if(col[0].constructor === Array) {
			for(var x = 0; x < col.length; x++) {
				for(var y = 0; y < col[x].length; y++) {
					func(col[x][y]);
				}
			}
		} else {
			for(var i = 0; i < col.length; i++) {
				func(col[i]);
			}
		}
	}

	function generateFoliage() {
		var image = Game.getGame().cache.getFrameByName("tileset_forest", "terrain_floor.png");
		forAll(tiles, function(tile) {
			if(tile.tileType == TileType.WATER) return;
			if(Math.random() < 0.03) {
				var chance = Math.random();
				if(chance < 0.5) {
					Game.getGame().add.sprite(tile.position.x, tile.position.y + image.height / 4, 'tileset_forest', 'foliage_flower_01.png');
				} else if(chance < 0.7) {
					Game.getGame().add.sprite(tile.position.x, tile.position.y + image.height / 4, 'tileset_forest', 'foliage_flower_02.png');
				} else if(chance < 0.9) {
					Game.getGame().add.sprite(tile.position.x, tile.position.y + image.height / 4, 'tileset_forest', 'foliage_flower_03.png');
				} else {
					Game.getGame().add.sprite(tile.position.x, tile.position.y + image.height / 4, 'tileset_forest', 'foliage_sprinkle_01.png');
				}
			}
		});
	}

	function generateTerritories() {
		for(var x = 0; x < worldSize; x += territorySize) {
			var coordX = x / territorySize;
			territories[coordX] = [];
			for(var y = 0; y < worldSize; y += territorySize) {
				var coordY = y / territorySize;
				var territory = new Territory();
				territory.setCenter(gridToWorld((x + (territorySize / 2)), y + (territorySize / 2)));
				for(var terX = x; terX < x + territorySize; terX++) {
					for(var terY = y; terY < y + territorySize; terY++) {
						territory.addTile(tiles[terX][terY]);
					}
				}
				territory.coords = { x: coordX, y: coordY };
				territories[coordX][coordY] = territory;
			}
		}
	}

	function calculateBounds() {
		forAll(territories, function(territory) {
			territory.calculateBounds();
		});
	}

	function getTileCount() {
		var count = 0;
		for(var i = 0; i < tiles.length; i++) {
			for(var j = 0; j < tiles[i].length; j++) {
				count++;
			}
		}
		return count;
	}

	function getTile(x, y) {
		if(tiles === undefined || tiles[x] === undefined)
			return undefined;
		return tiles[x][y];
	}

	function getTerritory(x, y) {
		if(territories === undefined || territories[x] === undefined)
			return undefined;
		return territories[x][y];
	}

	return {
		create: create,
		update: update,
		getTile: getTile,
		getGraphics: getGraphics
	}

})();
