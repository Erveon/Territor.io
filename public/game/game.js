var Game = (function() {

	var game;
	var cursors;

	$(document).ready(function() {
		Conn.create();
		game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	});

	function preload() {
		game.load.atlas('tileset_forest', 'images/tileset_forest.png', 'images/tileset_forest.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.image('hover', 'images/sprite_select.png');
	}

	function create() {
		Camera.create(game);
		World.create(game);
		game.camera.x = -1000;
		game.camera.y = 1000;
	}

	function update() {
		Camera.update(game);
		World.update(game);
	}

	function getGame() {
		return game;
	}

	return {
		getGame: getGame
	}

})();
