const PhoneUserModel = require("../models/PhoneUserModel");
const MessageModel = require("../models/MessageModel");
const apiResponse = require("../helpers/apiResponse");

exports.get = [
	(req, res) => {
		try {
            PhoneUserModel.findById(req.query.user).exec(function(err, user){
                console.log('users : ', user);
                console.log('err', err);

				return MessageModel.find({user: user._id}).exec(function(err, messages){
					console.log('users : ', messages);
					console.log('err', err);
					return res.send(messages);
				}); 
            });  
    
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];