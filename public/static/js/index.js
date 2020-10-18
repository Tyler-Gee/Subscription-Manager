import Landing from "./views/Landing.js";
import CreateAccount from "./views/CreateAccount.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        {path: "/", view: Landing},
        //{path: "/forgot-password", view: () => console.log("View forgot-password")},
        {path: "/need-account", view: CreateAccount},
        //{path: "/create-account", view: () => console.log("View sign-in")},
        //{path: "/sign-in", view: () => console.log("View sign-in")},
        //{path: "/sign-in-google", view: () => console.log("View sign-in via Google")},
        //{path: "/sign-in-facebook", view: () => console.log("View sign-in via Facebook")},
        //{path: "/sign-in-paypal", view: () => console.log("View sign-in via Paypal")}
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match){
        match = {
            route: "Route 404: Page not found",
            isMatch: false
        }
    }
    
    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getHtml();
    
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if((e.target.hasAttribute("data-link")) || (e.target.parentElement.hasAttribute("data-link"))){
            e.preventDefault();
            e.target.hasAttribute("data-link") ? navigateTo(e.target.href) : navigateTo(e.target.parentElement.href);
        }
    });

    router();
});


/*docReady(function () {
    var usernameCookie = getCookie("username");
    var passwordCookie = getCookie("password");
    if(usernameCookie && passwordCookie){
        signIn(usernameCookie, passwordCookie);
    }

    document.getElementsByClassName("sign-in-module__btn")[0].addEventListener("click", (event) => {
        event.preventDefault();

        // Gather user data
        var user_username = document.getElementsByClassName("sign-in-module__form--username")[0].value;
        let user_password = document.getElementsByClassName("sign-in-module__form--password")[0].value;
        
        // verify username: no special characters can get through to the database for security reasons
        const acceptFormat = verifyUsernameFormat(user_username);

        if(acceptFormat.length == 0){
            let signInProm = signIn(user_username, user_password);
            signInProm.then((response) => {
                if(response == "sign-in--success"){
                    if(document.getElementsByClassName("sign-in-module__checkbox--checkbox")[0].checked == true){
                        usernameCookie = getCookie("username");
                        passwordCookie = getCookie("password");

                        if(usernameCookie.length == 0 && passwordCookie.length == 0){
                            createCookie("username", user_username, 1000);
                            createCookie("password", user_password, 1000);
                        }
                    }
                }
            }).catch((error) => {console.log("Throw Errors");});
        }
        else{
            console.log("username is not in a valid format");
            acceptFormat.forEach((errorCode) => {
				console.log(errorCode);
			});
        }

    },false);

	document.getElementsByClassName("btn sign-in-module__btn--password-recover")[0].addEventListener("click",(event) => {
        event.preventDefault();    
        //document.cookie = "password=; expires=Thu, 01 Jan 1971 00:00:00 UTC; path=/;";
        alert(document.cookie);
    },false);
}); */

//this is just a test of creating a user
function createaccountexample(){
    return "hello";
    /* document.getElementsByClassName("sign-in-module__btn")[0].addEventListener("click", (event) => {
        event.preventDefault();

        
        var user_username = document.getElementsByClassName("sign-in-module__form--username")[0].value;
        let user_password = document.getElementsByClassName("sign-in-module__form--password")[0].value;
        var usernameValidationErrors = verifyUsernameFormat(user_username);
        
        if (usernameValidationErrors.length == 0) {
            const createAccountPromise = createNewUser(
                `/uniqueUsername/:${user_username}`,
                `/createUser/:${user_username}/:${user_password}`
            );

            createAccountPromise.then((response) => {
                if(document.getElementsByClassName("sign-in-module__checkbox--checkbox")[0].checked == true){
                    document.cookie = `username=${user_username}`;
                    document.cookie = `password=${user_password}`;
                }
            })
            .catch((error) => {
                console.log(`Status: ${error}`);
            });


        } else {
            // if not valid username
            usernameValidationErrors.forEach((errorCode) => {
                console.log(errorCode);
            });
        }
    },false); */
}


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

function verifyUsernameFormat(str) {
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

function HTTP_ROUTE__returnFetchAsPromise(path) {
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

async function HTTP_REQUEST__fetchAsync(path) {
    try{
        const response = await fetch(path)
        console.log(await response.text());
    }
    catch(err) {
        console.error("fetch failed", err);
    }
}

async function createNewUser(pathOne, pathTwo) {
    var uniqueUsernameResults = await HTTP_ROUTE__returnFetchAsPromise(pathOne);
	if (uniqueUsernameResults == "username--nonexistent") {
        await HTTP_REQUEST__fetchAsync(pathTwo);;
        console.log("Account created");
        return "success";
	} else {
        console.log("Username is already in use.");
        return "failure";
	}
}

async function signIn(username_str, password_str) {
	//check if username exists in the system
    const usernameExists = await HTTP_ROUTE__returnFetchAsPromise(`/uniqueUsername/:${username_str}`);
	if (usernameExists == "username--exists") {
		const credentialsCorrect = await HTTP_ROUTE__returnFetchAsPromise(
			`/verifyCredentials/:${username_str}/:${password_str}`
		);
		if (credentialsCorrect == "credentials--correct") {
			// if http request is successful, check if a valid user and password was found on the database
            console.log(credentialsCorrect);
            return "sign-in--success";
        }
        else {
			// let the user know that they have entered a wrong username or password
            console.log("Password entered is incorrect");
            return "sign-in--failure-incorrect-password";
		}
    } 
    else {
        console.log("username does not exists");
        return "sign-in--failure-nonexistent-account";
	}
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function createCookie(name, value, expireDayCount){
    var currentDate = new Date();
    currentDate.setTime(currentDate.getTime + (expireDayCount*1000*60*60*24));
    var expires = "expires=" + currentDate.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
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



//check if username exists in the system
            const usernameExists = HTTP_ROUTE__returnFetchAsPromise(`/uniqueUsername/:${user_username}`);

            usernameExists.then((response) => {
                if(response == "username--exists"){
                    // check if username and password are correct
                    const accountExists = HTTP_ROUTE__returnFetchAsPromise(
                        `/verifyCredentials/:${user_username}/:${user_password}`
                    );

                    accountExists.then((response) => {
                        // if http request is successfull, check if a valid user and password was found on the database
                        if (response == "credentials--correct") {
                            var usernameCookie = getCookie("username");
                            var passwordCookie = getCookie("password");

                            // if no cookie for the user was found, create one
                            if (usernameCookie == null || passwordCookie == null) {
                                createCookie("username", user_username, 1000);
                                createCookie("password", user_password, 1000);
                            }

                        } else {
                            // let the user know that they have entered a wrong username or password
                            console.log("Password entered is incorrect");
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("There was an error in trying to verify your user account information");
                    });
                    
                }
                else {
                    console.log("username does not exists");
                }
			}).catch((error) => {
                console.log("there was an error when trying to determine if the username entered is in the database");
			});
*/ 
