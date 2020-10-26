const express = require("express");
const mongoose = require("mongoose");
const models = require('./models')(mongoose);

const mongoPort = 2717;
const mongoDatabase = "subscription-manager";

mongoose.connect(`mongodb://localhost:${mongoPort}/${mongoDatabase}`,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.once("open", () => {
    console.log("Connected")
}).on("error", (error) => {
    console.log("connection failed", error);
}),{ useUnifiedTopology: true };

const router = express.Router();

router.get("/users", function (req, res) {
    console.log("hello");
    models.User.find(function (err, users) {
        console.log(users);
        res.send(users);
    });
});

router.get("/uniqueUsername/:username", function(req, res) {
    console.log("test");
    models.User.findOne({ username: req.params.username.substring(1) }, function (err, obj) {
        console.log(obj);
        obj == null ? res.send("username--nonexistent") : res.send("username--exists");
    });
});

router.get("/verifyCredentials/:username/:password", (req, res) => {
    //let credentials = `username: ${req.params.username.substring(1)}, password: ${req.params.password.substring(1)}`;
    models.User.findOne({username: req.params.username.substring(1), password: req.params.password.substring(1)}, (err, obj) => {
        obj != null ? res.send("credentials--correct") : res.send("credentials--incorrect");
    });
});


router.get("/createUser/:username/:password/:secQuestOne/:secAnswOne/:secQuestTwo/:secAnswTwo", function (req, res) {
    let newUser = new models.User({
        username: req.params.username.substring(1),
        password: req.params.password.substring(1),
        secQuestOne: req.params.secQuestOne.substring(1),
        secAnswOne: req.params.secAnswOne.substring(1),
        secQuestTwo: req.params.secQuestTwo.substring(1),
        secAnswTwo: req.params.secAnswOne.substring(1),
    });

    newUser.save(function (err) {
        if (err) return handleError(err);
    });

    res.send(`
        Username: ${req.params.username.substring(1)}\n
        Password: ${req.params.password.substring(1)}\n
        Question One: ${req.params.secQuestOne.substring(1)}\n
        Answer One:${req.params.secAnswOne.substring(1)}\n
        Question Two: ${req.params.secQuestTwo.substring(1)}\n
        Answer Two: ${req.params.secAnswTwo.substring(1)}\n
    `);
});

module.exports = router;  