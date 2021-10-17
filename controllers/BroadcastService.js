const Message = require("../models/MessageModel");
const PhoneUser = require("../models/PhoneUserModel")


const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
//const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
var request = require('request');

exports.sendMessage = [
	
	(req, res) => {
		try {
			const errors = validationResult(req);
            var msg = req.body.message;

            console.log('received message ' + JSON.stringify(msg));

            
            PhoneUser.find({status:"opt-in"}).then((users) =>{

                console.log("users" + JSON.stringify(users));

                var arrayOfIds = [];
            const requests = [];
            let count =0;
            for(var i in users){
                let user = users[i];
                var postData = {
                    'to': user.phoneNo
                };
                postData.text = {};
                postData.text.body=msg;
                var clientServerOptions = {
                    uri: process.env.WEBHOOK_URL,
                    body: JSON.stringify(postData),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':'Bearer ' + process.env.API_TOKEN
                    }
                }
            requests.push( // push a request to array dynamically 
                request(clientServerOptions, function (error, response){
                 ++count;
                 if (count == requests.length){
                    return apiResponse.successResponse(res, 'sent message to all users');
                 }
                if(!error && response.statusCode == 200){
                arrayOfIds.push(body.id);
                }
            }));
            }

                           

            });

            

            
            
            
                 
           
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

