var Territory = function(cgroup) {

    var group = cgroup.add(Game.getGame().add.group());
    var hoverimg;
    var center;

    function draw() {
        for(var x = 0; x < this.tiles.length; x++) {
			for(var y = 0; y < this.tiles[x].length; y++) {
				var tile = this.tiles[x][y];
                tile = drawTile(tile, 'tileset_forest', tile.sprite + '.png');
                tile.anchor.set(0.5, 0);
                this.tiles[x][y] = tile;
			}
		}
        var middle = Math.floor(this.tiles.length / 2);
        var centerTile = this.tiles[middle][middle];
        this.center = {
            x: centerTile.x,
            y: centerTile.y + centerTile.height / 4
        };
    }

	function drawTile(tile, tileset, sprite) {
		var position = World.gridToWorld(tile.coords.x, tile.coords.y);
		return $.extend(group.create(position.x, position.y, tileset, sprite), tile);
	}

    function onMouseEnter() {
        hoverimg = Game.getGame().add.sprite(this.center.x, this.center.y, 'hover');
        hoverimg.anchor.set(0.5, 0.5);
    }

    function onMouseLeave() {
        hoverimg.destroy();
    }

    return {
        draw: draw,
        onMouseLeave: onMouseLeave,
        onMouseEnter: onMouseEnter
    };
};
