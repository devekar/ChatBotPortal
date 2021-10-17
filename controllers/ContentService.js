const ContentModel = require("../models/ContentModel");
const apiResponse = require("../helpers/apiResponse");

// TODO: Return users by most recently messaged

exports.get = [
	(req, res) => {
		try {
            ContentModel.find().exec(function(err, users){
                console.log('users : ', users);
                console.log('err', err);
                return res.send(users);
            });     
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];