var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ContentSchema = new Schema({

	key: {type: String, required: true},	
	text: {type: String, required: true}
}, {timestamps: true});

const Content = mongoose.model('Content', ContentSchema);



var RuleSchema = new Schema({

	name: {type: String, required: true},	
	trigger: {type: String, required: true},
    contents: [{ type: Schema.Types.ObjectId, ref: 'Content' }]

}, {timestamps: true});

const Rule = mongoose.model('Rule', RuleSchema);

module.exports = {Content, Rule}