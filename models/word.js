var mongoose = require("mongoose");

var wordSchema = new mongoose.Schema({
    word: String,
    details: String,
    discovered: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Word", wordSchema);