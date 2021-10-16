var mongoose = require("mongoose");

var PhoneUserSchema = new mongoose.Schema({
	name: {type: String},
	phoneNo: {type: String, required: true},
    status : {type:String, required: true}
}, {timestamps: true});



module.exports = mongoose.model("PhoneUser", PhoneUserSchema);