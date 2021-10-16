var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	fullname: {type: String},
	username: {type: String, required: true},
    password : {type:String, required: true},
    admin: {type:Boolean}
}, {timestamps: true});



module.exports = mongoose.model("Users", UserSchema);