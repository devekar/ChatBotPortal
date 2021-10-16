const MessageModel = require("../models/MessageModel");
const apiResponse = require("../helpers/apiResponse");
const mongoose = require('mongoose')

// TODO: Return users by most recently messaged

exports.sendResponse = [
	(req, res) => {
		try {
            MessageModel.find().exec(function(err, users){
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