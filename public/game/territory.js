var Territory = function(cgroup) {

    var group = cgroup.add(Game.getGame().add.group());
    var hoverimg;
    var center;
	var style = { fontSize: "40px", fill: "#ffffff", align: "center" };

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

	function drawCharacter(name) {
		var base = Game.getGame().add.sprite(this.center.x, this.center.y, 'characters', '01-char_base.png');
		base.anchor.set(0.5, 0.5);
		var num = Game.getGame().add.sprite(this.center.x, this.center.y, 'characters', 'dice_numbers-1a5.png');
		num.anchor.set(0.5, 0.5);
		var base2 = Game.getGame().add.sprite(this.center.x, this.center.y - 32, 'characters', '01-char_base.png');
		base2.anchor.set(0.5, 0.5);
		var num2 = Game.getGame().add.sprite(this.center.x, this.center.y - 32, 'characters', 'dice_numbers-2a6.png');
		num2.anchor.set(0.5, 0.5);
		var head = Game.getGame().add.sprite(this.center.x, this.center.y - 64, 'characters', 'z-char_rooster.png');
		head.anchor.set(0.5, 0.5);
		var text = Game.getGame().add.text(this.center.x, this.center.y + 64, name, style);
		text.font = "Troika";
		text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    	text.anchor.set(0.5);
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
        onMouseEnter: onMouseEnter,
		drawCharacter: drawCharacter
    };
};
