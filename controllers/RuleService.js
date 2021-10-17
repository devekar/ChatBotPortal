const RuleModel = require("../models/RuleModel");
const apiResponse = require("../helpers/apiResponse");

exports.get = [
	(req, res) => {
		try {
            RuleModel.find().exec(function(err, users){
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
