var Conn = (function() {

	var socket;

	function create() {
		socket = io.connect('http://localhost:3000');
	}

	function getSocket() {
		return socket;
	}

	return {
		create: create,
		getSocket: getSocket
	};

})();
