/// https://www.youtube.com/watch?v=OstALBk-jTc&t=705s&ab_channel=dcode 10 mins


import Landing from "./views/Landing.js";
import CreateAccount from "./views/CreateAccount.js";
import AccountRecovery from "./views/AccountRecovery.js";
import Dashboard from "./views/Dashboard.js";

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
}
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    //console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)));

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
}

const router = async () => {
    const routes = [
        {path: "/", view: Landing},
        {path: "/:username", view: Dashboard},
        {path: "/forgot-password", view: AccountRecovery},
        {path: "/need-account", view: CreateAccount},
        {path: "/sign-in-google", view: () => console.log("View sign-in via Google")},
        {path: "/sign-in-facebook", view: () => console.log("View sign-in via Facebook")},
        {path: "/sign-in-paypal", view: () => console.log("View sign-in via Paypal")}

    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if(!match){
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }
    
    const view = new match.route.view(getParams(match));
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

docReady(function () {
    var usernameCookie = getCookie("username");
    var passwordCookie = getCookie("password");
    if(usernameCookie && passwordCookie){
        signIn(usernameCookie, passwordCookie);
    }

    var signInBtn = document.getElementsByClassName("sign-in-module__btn")[0];
    if(signInBtn){
        signInBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // Gather user data
        let user_username = document.getElementsByClassName("sign-in-module__form--username")[0].value;
        let user_password = document.getElementsByClassName("sign-in-module__form--password")[0].value;
        
        // verify username: no special characters can get through to the database for security reasons
        const acceptFormat = verifyStringFormat(user_username, true, true, true, true);

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
                    setInnerHtml(Dashboard, "app", "id")
                }
            }).catch((error) => {
                console.log("Throw Errors");
            });
        }
        else{
            console.log("username is not in a valid format");
            acceptFormat.forEach((errorCode) => {
				console.log(errorCode);
			});
        }

    },false);
    }

    var forgotPasswordBtn = document.getElementsByClassName("sign-in-module__btn--password-recover")[0];
    if(forgotPasswordBtn){
        forgotPasswordBtn.addEventListener("click",(event) => {
        event.preventDefault();    
        //document.cookie = "password=; expires=Thu, 01 Jan 1971 00:00:00 UTC; path=/;";
        alert(document.cookie);
    },false);
    }

    var needAccountBtn = document.getElementsByClassName("create-account-module__btn")[0];
    if(needAccountBtn){
        needAccountBtn.addEventListener("click", (event) => {
            event.preventDefault();
            var userInput = [
                document.getElementsByClassName("credentials--username")[0].value,
                document.getElementsByClassName("credentials--password-one")[0].value,
                document.getElementsByClassName("credentials--password-two")[0].value,
                document.getElementsByClassName("security-question--one")[0].value,
                document.getElementsByClassName("security-question-answer--one")[0].value,
                document.getElementsByClassName("security-question--two")[0].value,
                document.getElementsByClassName("security-question-answer--two")[0].value
            ];
            
            var inputValidationReport = [
                verifyStringFormat(userInput[0], true, true, true),
                verifyStringFormat(userInput[1], true, false, true, false),
                verifyStringFormat(userInput[2],true, false, true, false),
                verifyStringFormat(userInput[3],true, false, false, true),
                verifyStringFormat(userInput[4],true, false, false, true),
                verifyStringFormat(userInput[5],true, false, false, true),
                verifyStringFormat(userInput[6],true, false, false, true)
            ];

            if(userInput[1] != userInput[2]){
                inputValidationReport[inputValidationReport.length] = "INV_NO-MATCH";
            }

            var errCodeFound = false;
            inputValidationReport.forEach((errorCode) => {
                if(errorCode.length > 0){   
                    errCodeFound = true;
                    console.log(errorCode);
                }
            });

            if(errCodeFound == false){
                //user can create account now
                var createAccountProm = createNewUser(
                    `/uniqueUsername/:${userInput[0]}`,
                    `/createUser/:${userInput[0]}/:${userInput[1]}/:${userInput[3]}/:${userInput[4]}/:${userInput[5]}/:${userInput[6]}`
                );
                
                createAccountProm.then((response) => {
                    if(response == "success"){
                        navigateTo("/");
                    }
                    else {
                        statusMessage(response, "Database response\nFormat: Ok");
                        // /Location.reload();
                    }
                }).catch((err) => {
                    location.reload();
                });
            }
            else{
                // there was an issue and user needs to be use different 
                console.log("User input did not match the required format\n");
                location.reload();
            }

        },false);   
    }
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
        var charCode = str.charCodeAt(i);
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
		var charCode = str.charCodeAt(i);
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
		var charCode = str.charCodeAt(i);
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

function verifyStringFormat(str,  CHECK_empty, CHECK_length, CHECK_whitespace, CHECK_characters) {
    const errorCode = [
        "INV_EMPTY",
        "INV_LENGTH",
        "INV_WHITESPACE",
        "INV_CHARACTER",
    ];
    var errorResults = new Array();

    // check for empty string
    if(CHECK_empty == true){
        if(str.length == 0){
            errorResults.push(errorCode[0]);
        }
    }

    // Check for valid length
    if(CHECK_length == true){
        if(str.length > 16){
            errorResults.push(errorCode[1]);
        }        
    }

    // Check for any whitespace
    if(CHECK_whitespace == true){
        if(containsWhitespace(str)){
            errorResults.push(errorCode[2]);
        }
    }

    //check for any special characters
    if(CHECK_characters == true){
        if(containsSpecialCharacter(str)){
            errorResults.push(errorCode[3]);
        }
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

function statusMessage(status, reason){
    console.log(`Status: ${status}\nReason: ${reason}`);
}

async function setInnerHtml(pageView, name, attributeType) {
    var elementToFill;
    const view = new pageView();
    await view.getHtml().then(response => {
        (attributeType == "id") ? elementToFill = `#${name}` : elementToFill = `.${name}`;
        document.querySelector(elementToFill).innerHTML = response;
        return;
    }).catch(err => {
        console.log(err);
        return;
    });
}