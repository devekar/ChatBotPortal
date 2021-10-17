const PhoneUserModel = require("../models/PhoneUserModel");
const MessageModel = require("../models/MessageModel");
const AutoReplyModel = require("../models/AutoReplyModel");
const apiResponse = require("../helpers/apiResponse");

exports.get = [
	(req, res) => {
		try {
            PhoneUserModel.findById(req.query.user).exec(function(err, user){
                console.log('users : ', user);
                console.log('err', err);

				return MessageModel.find({user: user._id}).lean().exec(function(err, messages){
					console.log('users : ', messages);
					console.log('err', err);

					AutoReplyModel.find({user: user._id}).lean().exec(function(err, replies){
						replies.map(r => { r.reply = true} );
						const arr = [...messages, ...replies];
						arr.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
						return res.send(arr);
					});
				}); 
            });  
    
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];