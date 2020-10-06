docReady(function () {
    document.getElementsByClassName("sign-in-module__btn")[0].addEventListener("click", function(event){
        event.preventDefault();

        //Gather account username
        let user_username = document.getElementsByClassName("sign-in-module__form--username")[0].value;
        let user_password = document.getElementsByClassName("sign-in-module__form--password")[0].value;

        createNewUser(`/uniqueUsername/:${user_username}`, `/createUser/:${user_username}/:${user_password}`);

        /* let fetchPromise = new Promise((resolve, reject) => {
			fetch(`/uniqueUsername/:${user_username}`, {
				method: "GET",
			})
				.then((response) => response.text())
				.then((data) => {
					if (data == "true") {
						resolve("username is unique");
					} else if (data == "false") {
						reject("Username is already in use");
					}
				});
        });
        
        fetchPromise.then((message) =>{
            console.log(message);
            console.log("User is being created");
            fetch(`/createUser/:${user_username}/:${user_password}`, {
				method: "GET",
			})
				.then((response) => response.text())
				.then((data) => {
					console.log(data);
				});
        }).catch((message) => {
            console.log(message);
        }); */

        /* // Validate account username
        let usernameValidationErrors = verifyUsernameFormat__accountRegistry(user_username);
        //let user_password = document.getElementsByClassName("sign-in-module__form--password")[0].value;

        // If username is valid - check if username is unique
        if (usernameValidationErrors.length == 0) {
            var test = HTTP_ROUTE__checkUniqueUsername(user_username);
            console.log("This is the answer from the server through fetch\n" + test);
        }
        else{
            usernameValidationErrors.forEach(function (errorCode){
                console.log(errorCode);
            });
        }
 */

        
        




        /* //Gather account username
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
        */
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

function verifyUsernameFormat__accountRegistry(username_str) {
    const errorCode = [
        "INV_EMPTY",
        "INV_LENGTH",
        "INV_WHITESPACE",
        "INV_CHARACTER",
    ];
    var errorResults = new Array();

    // Check for valid length
    if(username_str.length == 0 || username_str.length > 16){
        username_str.length == 0 ? errorResults.push(errorCode[0]) : errorResults.push(errorCode[1]);
    }
    // Check for any whitespace
    if(containsWhitespace(username_str)){
        errorResults.push(errorCode[2]);
    }
    //check for any special characters
    if(containsSpecialCharacter(username_str)){
        errorResults.push(errorCode[3]);
    }

    return errorResults;
}

function HTTP_ROUTE__returnFetchAsPromise(path) {
	return new Promise((resolve, reject) => {
		fetch(path).then(
			(response) => {
				var result = response.text();
				resolve(result);
			},
			(error) => {
				reject(error);
			}
		);
	});
}

async function HTTP_REQUEST__fetchAsync(path) {
    try{
        //const response = await fetch(path)
        console.log(await (await fetch(path)).text());
    }
    catch(err) {
        console.error("fetch failed", err);
    }
}

async function createNewUser(pathOne, pathTwo) {
	var result = await HTTP_ROUTE__returnFetchAsPromise(pathOne);
	if (result == "true") {
        await HTTP_REQUEST__fetchAsync(pathTwo);
	} else {
		console.log("Username is already in use.");
	}
}

/* 

https://www.geeksforgeeks.org/how-to-make-javascript-wait-for-a-api-request-to-return/
https://medium.com/@armando_amador/how-to-make-http-requests-using-fetch-api-and-promises-b0ca7370a444
https://developers.google.com/web/fundamentals/primers/async-functions#top_of_page
function HTTP_ROUTE__fetchBasic(path){
    fetch(path).then(function (response) {
		if (response.ok) {
            console.log(response.text());
			return response.text();
		} else {
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	});
} 
function HTTP_REQUEST__fetchBasicTwo(path){
    return fetch(path)
		.then((response) => response.text())
		.then((text) => {
			console.log(text);
        }).catch(err => {
            console.error('fetch failed', err);
        });
}
function HTTP_ROUTE__fetchPromise(path) {
	return new Promise((resolve, reject) => {
		fetch(path).then(
			(response) => {
				resolve(response.text());
			},
			(error) => {
				reject(error);
			}
		);
	});
}
async function HTTP_ROUTE__fetchAsync(path) {
    try {
		const response = await fetch(path);
		console.log(await response.text());
	} catch (err) {
		console.error("fetch failed", err);
	}
}

function javascript_promise(){
    let prom = new Promise((resolve, reject) => {
        let a = 1 + 2;
        if(a == 3){
            resolve("true")
        }
        else{
            reject("false");
        }
    });
    prom.then((message) => {
        console.log("This is correct");
    }).catch((message) => {
        console.log("This is incorrect");
    });
}
*/ 
