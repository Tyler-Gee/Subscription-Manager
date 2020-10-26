const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = function() {
    const UserCredentials = new Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: { type: String, min: 8, max: 64 },
        secQuestOne: {type: String},
        secAnswOne: {type: String},
        secQuestTwo: {type: String},
        secAnswTwo:{type: String}
    });

    var models = {
        User: mongoose.model("users", UserCredentials)
    };

    return models;
}
