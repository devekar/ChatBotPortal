var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ContentSchema = new Schema({

	key: {type: String, required: true},	
	text: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("contents", ContentSchema);
