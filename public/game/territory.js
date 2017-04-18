var Territory = function() {

    var self = this;
    var tiles = [];

    var hoverimg;

    function addTile(tile) {
        tile.territory = self;
        tiles.push(tile);
    }

	function getTiles() {
		return tiles;
	}

	function forAllTiles(func) {
		for(var i = 0; i < tiles.length; i++) {
			func(tiles[i]);
		}
	}

    function setCenter(center) {
        this.center = center;
    }

    function onMouseEnter() {
        //hoverimg = Game.getGame().add.sprite(this.center.x, this.center.y, 'hover');
        //hoverimg.anchor.set(0.5, 0.5);
    }

    function onMouseLeave() {
        //hoverimg.destroy();
    }

    return {
        addTile: addTile,
		getTiles: getTiles,
		forAllTiles: forAllTiles,
        onMouseLeave: onMouseLeave,
        onMouseEnter: onMouseEnter,
        setCenter: setCenter
    };
};
