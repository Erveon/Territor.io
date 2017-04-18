var Chunk = function(world, coords, tiles) {

    var TileType = {
		GRASS: 0,
		WATER: 1
	}

    function draw() {
        for(var x = 0; x < tiles.length; x++) {
            for(var y = 0; y < tiles[x].length; y++) {
                var tile = tiles[x][y];
                if(tile._type === TileType.GRASS) {
                    tile = drawTile(tile, 'tileset_forest', 'terrain_floor.png');
                } else if(tile._type === TileType.WATER) {
                    var topRight = getTile(tile._coords.x, tile._coords.y - 1);
                    var topLeft = getTile(tile._coords.x - 1, tile._coords.y);
                    var botLeft = getTile(tile._coords.x, tile._coords.y + 1);
                    var botRight = getTile(tile._coords.x + 1, tile._coords.y);
                    var right = getTile(tile._coords.x + 1, tile._coords.y - 1);
                    var left = getTile(tile._coords.x - 1, tile._coords.y + 1);
                    var top = getTile(tile._coords.x - 1, tile._coords.y - 1);
                    var bot = getTile(tile._coords.x + 1, tile._coords.y + 1);
                    if(topRight === undefined || topRight._type === TileType.GRASS) {
                        if(topLeft === undefined || topLeft._type === TileType.GRASS) {
                            tile = drawTile(tile, 'tileset_forest', 'water_topin.png');
                        } else if(botRight === undefined || botRight._type === TileType.GRASS) {
                            tile = drawTile(tile, 'tileset_forest', 'water_rightin.png');
                        } else {
                            tile = drawTile(tile, 'tileset_forest', 'water_topright.png');
                        }
                    } else if(botLeft === undefined || botLeft._type === TileType.GRASS) {
                        if(botRight === undefined || botRight._type === TileType.GRASS) {
                            tile = drawTile(tile, 'tileset_forest', 'water_botin.png');
                        } else if(topLeft === undefined || topLeft._type === TileType.GRASS) {
                            tile = drawTile(tile, 'tileset_forest', 'water_leftin.png');
                        } else {
                            tile = drawTile(tile, 'tileset_forest', 'water_botleft.png');
                        }
                    } else if(topLeft === undefined || topLeft._type === TileType.GRASS) {
                        tile = drawTile(tile, 'tileset_forest', 'water_topleft.png');
                    } else if(botRight === undefined || botRight._type === TileType.GRASS) {
                        tile = drawTile(tile, 'tileset_forest', 'water_botright.png');
                    } else if(right === undefined || right._type === TileType.GRASS) {
                        tile = drawTile(tile, 'tileset_forest', 'water_rightout.png');
                    } else if(left === undefined || left._type === TileType.GRASS) {
                        tile = drawTile(tile, 'tileset_forest', 'water_leftout.png');
                    } else if(top === undefined || top._type === TileType.GRASS) {
                        tile = drawTile(tile, 'tileset_forest', 'water_topout.png');
                    }  else if(bot === undefined || bot._type === TileType.GRASS) {
                        tile = drawTile(tile, 'tileset_forest', 'water_botout.png');
                    } else {
                        tile = drawTile(tile, 'tileset_forest', 'water_main.png');
                    }
                }
                tile.anchor.set(0.5, 0);
                tiles[tile._chunkCoords.x][tile._chunkCoords.y] = tile;
            }
        }
    }

	function drawTile(tile, tileset, sprite) {
		var position = world.gridToWorld(tile._coords.x, tile._coords.y);
		return $.extend(Game.getGame().add.sprite(position.x, position.y, tileset, sprite), tile);
	}

	function getTile(x, y) {
		if(tiles === undefined || tiles[x] === undefined)
			return undefined;
		return tiles[x][y];
	}

    return {
        coords: coords,
        tiles: tiles,
        draw: draw
    };

};
