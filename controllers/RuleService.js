const RulesModel = require("../models/RulesModel");
const apiResponse = require("../helpers/apiResponse");

// TODO: Return users by most recently messaged

exports.get = [
	(req, res) => {
		try {
            RulesModel.find().exec(function(err, users){
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