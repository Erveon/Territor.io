var Chunk = function(coords, networkTerritories, wgroup) {

	var group = wgroup.add(Game.getGame().add.group());
	var territories = [];
	load();

    var TileType = {
		GRASS: 0,
		WATER: 1
	}

	function load() {
		for(var x = 0; x < networkTerritories.length; x++) {
			territories[x] = [];
            for(var y = 0; y < networkTerritories[x].length; y++) {
				var networkTerritory = networkTerritories[x][y];
                var territory = $.extend(new Territory(group), networkTerritory);
				territories[x][y] = territory;
            }
        }
	}

    function draw() {
        for(var x = 0; x < territories.length; x++) {
            for(var y = 0; y < territories[x].length; y++) {
                var territory = territories[x][y];
				territory.draw();
            }
        }
    }

	function getOffset() {
		return {
			x: Lobby.getInfo().chunkSize * Lobby.getInfo().territorySize * coords.x,
			y: Lobby.getInfo().chunkSize * Lobby.getInfo().territorySize * coords.y
		};
	}

	// gets territory by chunk tile
	function getTerritory(x, y) {
		var offset = getOffset();
		return territories[Math.floor((x - offset.x) / Lobby.getInfo().territorySize)]
						  [Math.floor((y - offset.y) / Lobby.getInfo().territorySize)];
	}

	function getGroup() {
		return group;
	}

    return {
        coords: coords,
        territories: territories,
        draw: draw,
		getGroup: getGroup,
		getOffset: getOffset,
		getTerritory: getTerritory
    };

};
