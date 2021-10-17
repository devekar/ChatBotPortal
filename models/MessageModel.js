var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	text: { type: String, required: true},	
	user: { type: Schema.ObjectId, ref: "PhoneUser", required: true }	
}, {timestamps: true});

module.exports = mongoose.model("messages", MessageSchema);