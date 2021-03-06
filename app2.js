// Express App (Routes)
// https://mongoosejs.com/docs/api.html
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const JavaScriptObfuscator = require("javascript-obfuscator");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

app.use(fileUpload());
app.use(express.static(__dirname + "/public/static"));

// Important, pass in port as in `npm run dev 1234`, do not change
const portNum = process.argv[2];

// Send HTML at root, do not change
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/static/html/index.html"));
});

// Send Style, do not change
app.get("/style.css", function (req, res) {
    //Feel free to change the contents of style.css to prettify your Web app
    res.sendFile(path.join(__dirname + "/css/style.css"));
});

//Send obfuscated JS, do not change
app.get("/index.js", function(req, res) {
	fs.readFile(path.join(__dirname + "/public/static/js/index.js"), "utf8", function(err, contents) {
		const minimizedContents = JavaScriptObfuscator.obfuscate(contents, { compact: true, controlFlowFlattening: true });
		res.contentType("application/javascript");
		res.send(minimizedContents._obfuscatedCode);
	});
}); 

app.use('/img', express.static(__dirname + '/public/img'));

//Respond to POST requests that upload files to uploads/ directory
app.post("/upload", function(req, res) {
	if (!req.files) {
		return res.status(400).send("No files were uploaded.");
	}

	let uploadFile = req.files.uploadFile;

	// Use the mv() method to place the file somewhere on your server
	uploadFile.mv("uploads/" + uploadFile.name, function(err) {
		if (err) {
			return res.status(500).send(err);
		}
		res.redirect("/");
	});
});

//Respond to GET requests for files in the uploads/ directory
app.get("/uploads/:name", function(req, res) {
	fs.stat("uploads/" + req.params.name, function(err, stat) {
		console.log(err);
		if (err == null) {
			res.sendFile(path.join(__dirname + "/uploads/" + req.params.name));
		} else {
			res.send("");
		}
	});
});





mongoose.connect("mongodb://localhost:2717/subscription-manager", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
	.once("open", () => console.log("Connected"))
	.on("error", (error) => {
		console.log("connection failed", error);
	}),
	{ useUnifiedTopology: true };

const usersCollectionSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, min: 8, max: 64 },
});

const userAccountCredentials = mongoose.model("users", usersCollectionSchema);

app.get("/users", function (req, res) {
	mongoose.model("users").find(function (err, users) {
		res.send(users);
	});
});

app.get("/uniqueUsername/:username", function(req, res) {
    userAccountCredentials.findOne({ username: req.params.username.substring(1) }, function (err, obj) {
        obj == null ? res.send("username--nonexistent") : res.send("username--exists");
    });
});

app.get("/verifyCredentials/:username/:password", (req, res) => {
    //let credentials = `username: ${req.params.username.substring(1)}, password: ${req.params.password.substring(1)}`;
    userAccountCredentials.findOne({username: req.params.username.substring(1), password: req.params.password.substring(1)}, (err, obj) => {
        obj != null ? res.send("credentials--correct") : res.send("credentials--incorrect");
    });
});

app.get("/createUser/:username/:password", function (req, res) {
	let newUser = new userAccountCredentials({
		username: req.params.username.substring(1),
		password: req.params.password.substring(1),
	});

	newUser.save(function (err) {
		if (err) return handleError(err);
	});

	res.send(`Username: ${req.params.username.substring(1)}\nPassword: ${req.params.password.substring(1)}\n`);
});














app.listen(portNum, () => {
	console.log(`Running app at localhost: ${portNum}`);
});