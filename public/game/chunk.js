var Chunk = function(world, coords, tiles, wgroup) {

	var group = wgroup.add(Game.getGame().add.group());

    var TileType = {
		GRASS: 0,
		WATER: 1
	}

    function draw() {
        for(var x = 0; x < tiles.length; x++) {
            for(var y = 0; y < tiles[x].length; y++) {
                var tile = tiles[x][y];
                tile = drawTile(tile, 'tileset_forest', tile._sprite + '.png');
                tile.anchor.set(0.5, 0);
                tiles[tile._chunkCoords.x][tile._chunkCoords.y] = tile;
            }
        }
    }

	function drawTile(tile, tileset, sprite) {
		var position = world.gridToWorld(tile._coords.x, tile._coords.y);
		return $.extend(group.create(position.x, position.y, tileset, sprite), tile);
	}

	function getTile(x, y) {
		if(tiles === undefined || tiles[x] === undefined)
			return undefined;
		return tiles[x][y];
	}

	function getGroup() {
		return group;
	}

    return {
        coords: coords,
        tiles: tiles,
        draw: draw,
		getGroup: getGroup
    };

};
