var Conn = (function() {

	var socket;

	function create() {
		socket = io.connect('http://localhost:3000');
		listen();
	}

	function listen() {
		socket.on('found lobby', function(data) {
			//console.log("Lobby found: " + data.id);
			socket.emit('send chunk', { x: 0, y: 0 });
		});
		socket.on('receive chunk', function(data) {
			console.log(data);
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
