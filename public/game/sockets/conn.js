var Conn = (function() {

	var socket;

	function create() {
		socket = io.connect('http://localhost:3000');
		listen();
	}

	function listen() {
		socket.on('chunk', function(chunk) {
			World.loadChunk(chunk);
		});
		socket.on('spawn', function(data) {
			Menu.fadeOut();
		});
	}

	function getSocket() {
		return socket;
	}

	return {
		create: create,
		getSocket: getSocket
	};

})();
