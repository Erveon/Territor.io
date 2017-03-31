var Menu = (function() {

	$(document).ready(function() {
		populate();
		listen();
	});

	function populate() {
		var username = localStorage.getItem("username");
		if(username) {
			$("#username").val(username);
		}
	}

	function listen() {
		$("body").on("click", "#play-btn", function() {
			var username = $("#username").val().trim();
			if(username) {
				console.log("Logging in as " + username);
				localStorage.setItem("username", username);
			}
		});
	}

})();
