docReady(function () {

    var signInButton = document.getElementsByClassName("sign-in-module__btn");

    signInButton[0].addEventListener("click", function(e){
        e.preventDefault();

        var user_username = document.getElementsByClassName("sign-in-module__form--username")[0].value;
        var user_password = document.getElementsByClassName("sign-in-module__form--password")[0].value;

        var verifyResults = verifyUsernameFormat__accountRegistry(user_username);
        console.log(verifyResults);
        
        var request = new XMLHttpRequest();
		request.open("GET", `/createUser/:${user_username}/:${user_password}`, true);

		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
                var resp = this.response;
                console.log(`${resp}`);
			} else {
                console.log("Error");
			}
		};
		request.onerror = function () {
            // There was a connection error of some sort
            console.log("Connection Error");
		};
        request.send();
    }
    ,false);
});


function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

function verifyUsernameFormat__accountRegistry(username) {
	//(username.match(/[|\\/~^:,;?!&%$@*+]/))
	/* Username Rules:
    - length 1-16
    - Characters: 0 - 9, a - z, A - z
    - No special characters, symbols or spaces
*/

	if (/\s/.test(username)) {
		return "error";
	}
	if (/[^a-zA-Z0-9]/.test(username)) {
		return "symbol";
	}

	function isAlphaNumeric(str) {
		var code, i, len;

		for (i = 0, len = str.length; i < len; i++) {
			code = str.charCodeAt(i);
			if (
				!(code > 47 && code < 58) && // numeric (0-9)
				!(code > 64 && code < 91) && // upper alpha (A-Z)
				!(code > 96 && code < 123)
			) {
				// lower alpha (a-z)
				return false;
			}
		}
		return true;
	}
}
