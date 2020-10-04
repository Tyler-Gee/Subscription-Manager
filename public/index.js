docReady(function () {

    document.getElementsByClassName("sign-in-module__btn")[0].addEventListener("click", function(event){
        event.preventDefault();

        //Gather user account information
        let user_username = document.getElementsByClassName("sign-in-module__form--username")[0].value;
        let user_password = document.getElementsByClassName("sign-in-module__form--password")[0].value;

        // Validate user account information
        let usernameValidationErrors = verifyUsernameFormat__accountRegistry(user_username);

        if (usernameValidationErrors.length == 0) {
			let request = new XMLHttpRequest();
			request.open("GET", `/createUser/:${user_username}/:${user_password}`, true);
			request.onload = function () {
				if (this.status >= 200 && this.status < 400) {
					let resp = this.response;
					console.log(resp);
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
    console.log(str);
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
