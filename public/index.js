docReady(function () {
    document.getElementsByClassName("sign-in-module__btn")[0].addEventListener("click", function(event){
        event.preventDefault();

        //Gather account username
        let user_username = document.getElementsByClassName("sign-in-module__form--username")[0].value;

        // Validate account username
        let usernameValidationErrors = verifyUsernameFormat__accountRegistry(user_username);

        // If username is valid - check if username is unique
        if (usernameValidationErrors.length == 0) {
            let request = new XMLHttpRequest();
            request.open("GET", `/uniqueUsername/:${user_username}`, true);
            
			request.onload = function () {
				if (this.status >= 200 && this.status < 400) {
                    // If response is true, then username is unique, go on to create user
                    if (this.response == "username--unique") {
                        console.log("username--unique");
                        
						let user_password = document.getElementsByClassName("sign-in-module__form--password")[0].value;

						let request = new XMLHttpRequest();
						request.open("GET", `/createUser/:${user_username}/:${user_password}`, true);

						request.onload = function () {
							if (this.status >= 200 && this.status < 400) {
                                // success
							} else {
								console.log("Error onload");
							}
						};
						request.onerror = function () {
							// There was a connection error of some sort
							console.log("Connection Error");
						};
						request.send();
					} else if ("username--non-unique") {
						// if response is anything but true
						console.log("username--non-unique");
					}
				} else {
					console.log("Error onload");
				}
			};
			request.onerror = function () {
				// There was a connection error of some sort
				console.log("Connection Error");
			};
			request.send();
		} else {
            usernameValidationErrors.forEach(function (errorCode){
                console.log(errorCode);
            });
		}

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

function isAlphaNumeric(str) {
    for(var i = 0; i < str.length; i++){
        charCode = str.charCodeAt(i);
        if( !(charCode >= 48 && charCode <= 57) &&  // 0-9
            !(charCode >= 65 && charCode <= 90) &&  // A-Z
            !(charCode >= 97 && charCode <= 122)){  // a-z 
            return false;    
        }
    }
    return true;
}

function containsWhitespace(str){
    for (var i = 0; i < str.length; i++) {
		charCode = str.charCodeAt(i);
		if (
            (charCode >= 9 && charCode <= 13) ||
            (charCode == 32) || (charCode == 133)  ||
            (charCode == 160)  ||
            (charCode == 5760)  ||
            (charCode >= 8192 && charCode <= 8202)  ||
            (charCode >= 8232 && charCode <= 8233)  ||
            (charCode == 8239)  ||
            (charCode >= 8287 && charCode <= 8288)){
			return true;
		}
	}
	return false;
}

function containsSpecialCharacter(str){
    for (var i = 0; i < str.length; i++) {
		charCode = str.charCodeAt(i);
		if (
            !(charCode >= 9 && charCode <= 13) &&
            !(charCode == 32) &&
            !(charCode == 133)  &&
            !(charCode == 160)  &&
            !(charCode == 5760)  &&
            !(charCode >= 8192 && charCode <= 8202)  &&
            !(charCode >= 8232 && charCode <= 8233)  &&
            !(charCode == 8239)  &&
            !(charCode >= 8287 && charCode <= 8288) &&       
            !(charCode >= 48 && charCode <= 57) &&
            !(charCode >= 65 && charCode <= 90) &&
            !(charCode >= 97 && charCode <= 122)){
			return true;
		}
	}
	return false;
}

function verifyUsernameFormat__accountRegistry(str) {
    const errorCode = [
        "INV_EMPTY",
        "INV_LENGTH",
        "INV_WHITESPACE",
        "INV_CHARACTER",
    ];
    var errorResults = new Array();

    // Check for valid length
    if(str.length == 0 || str.length > 16){
        str.length == 0 ? errorResults.push(errorCode[0]) : errorResults.push(errorCode[1]);
    }
    // Check for any whitespace
    if(containsWhitespace(str)){
        errorResults.push(errorCode[2]);
    }
    //check for any special characters
    if(containsSpecialCharacter(str)){
        errorResults.push(errorCode[3]);
    }

    return errorResults;
}



function HTTP_ROUTE__checkUniqueUsername(username_str) {
	var test;
	var request = new XMLHttpRequest();
	request.open("GET", `/uniqueUsername/:${username_str}`, true);

	request.onload = function () {
		if (this.status >= 200 && this.status < 400) {
			// Success!
			if (this.response == "username--unique") {
				return "true";
			} else {
				return "false";
			}
		} else {
			// We reached our target server, but it returned an error
			console.log(
				"The connection to subscription-manager database was completed, an answer to if the username is unique was not give -- Internal Error"
			);
		}
	};

	request.onerror = function () {
		// There was a connection error of some sort
	};

	request.send();
}

function HTTP_REQUEST__createNewUser(username_str, password_str) {
	let request = new XMLHttpRequest();
	request.open("GET", `/createUser/:${username_str}/:${password_str}`, true);

	request.onload = function () {
		if (this.status >= 200 && this.status < 400) {
			// success
		} else {
			console.log("Error onload");
		}
	};
	request.onerror = function () {
		// There was a connection error of some sort
		console.log("Connection Error");
	};
	request.send();
}