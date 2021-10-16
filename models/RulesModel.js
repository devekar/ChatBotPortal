var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RuleSchema = new Schema({

	name: {type: String, required: true},	
	trigger: {type: String, required: true},
    contents: [{ type: Schema.Types.ObjectId, ref: 'Content' }]

}, {timestamps: true});
