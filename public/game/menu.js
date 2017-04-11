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
				loading = true;
				console.log("Logging in as " + username);
				localStorage.setItem("username", username);
				Conn.getSocket().emit("set username", { "username": username });
				Conn.getSocket().emit("find lobby", {});
				$("#play-btn, .loader, .input-field").toggleClass("hide");
			}
		});
	}

})();
