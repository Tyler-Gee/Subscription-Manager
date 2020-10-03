docReady(function () {
    var signInButton = document.getElementsByClassName("sign-in-module__btn");

    signInButton[0].addEventListener("click", function(e){
        e.preventDefault();
        var user_email = document.getElementsByClassName("sign-in-module__form--email")[0].value;
		var user_password = document.getElementsByClassName("sign-in-module__form--password")[0].value;
        var request = new XMLHttpRequest();
		request.open("GET", `/signIn/${user_email}/${user_password}`, true);

		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
                var resp = this.response;
                //console.log(`${resp}\nUsername: ${userName[0]}\nPassword: ${password[0]}`);
                console.log(`${resp}`);
			} else {
                // We reached our target server, but it returned an error
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