docReady(function () {
	document.getElementsByClassName("sign-in-module__btn")[0].addEventListener("click", (event) => {
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
    },false);

	document.getElementsByClassName("btn sign-in-module__btn--password-recover")[0].addEventListener("click",(event) => {
        event.preventDefault();    
        //document.cookie = "password=; expires=Thu, 01 Jan 1971 00:00:00 UTC; path=/;";
        
    },false);
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
	if (uniqueUsernameResults == "true") {
        await HTTP_REQUEST__fetchAsync(pathTwo);;
        console.log("Account created");
        return "success";
	} else {
        console.log("Username is already in use.");
        return "failure";
	}
}

function createCookie(name, value, expireDayCount){
    var currentDate = new Date();
    currentDate.setTime(currentDate.getTime + (expireDayCount*1000*60*60*24));
    var expires = "expires=" + currentDate.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name){

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
