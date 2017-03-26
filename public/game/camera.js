var Camera = (function() {

	var game = game;
	var worldScale = 1;
	var scrollOffset = 0.05;
	var panning = false;

	function create(game) {
		this.game = game;
		game.stage.backgroundColor = "#341e3d";

		worldScale = 0.5;
		listen();
	}

	function isPanning() {
		return panning;
	}

	function update(game) {
		game.camera.scale.set(worldScale);
		if(game.input.activePointer.isDown && game.input.activePointer.withinGame) {
			if (game.origDragPoint) {
				panning = true;
				game.camera.x += game.origDragPoint.x - game.input.activePointer.position.x;
				game.camera.y += game.origDragPoint.y - game.input.activePointer.position.y;
			}
			game.origDragPoint = game.input.activePointer.position.clone();
		} else {
			panning = false;
			game.origDragPoint = null;
		}
	}

	function listen() {
		$(window).bind('mousewheel DOMMouseScroll', function(e) {
			if(e.originalEvent.wheelDelta / 120 > 0) {
				worldScale += scrollOffset;
			} else {
				worldScale -= scrollOffset;
			}
			worldScale = Phaser.Math.clamp(worldScale, 0.25, 2);
		});
	}

	return {
		create: create,
		update: update,
		isPanning: isPanning
	}

})();
