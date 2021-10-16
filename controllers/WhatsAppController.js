const Message = require("../models/MessageModel");
const PhoneUser = require("../models/PhoneUserModel")
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
//const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
var request = require('request');
const PhoneUserModel = require("../models/PhoneUserModel");

// Book Schema
function MessageData(data) {
	this.id = data._id;
	this.title= data.title;
	this.description = data.description;
	this.isbn = data.isbn;
	this.createdAt = data.createdAt;
}





/**
 * Book store.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.sendResponse = [
	
	(req, res) => {
		try {
			const errors = validationResult(req);
            var msg = req.body;

            var sender = msg.contacts[0].wa_id;

            var phonetext = msg.messages[0].text.body;

            var owner = msg.messages[0]._vnd.v1.author.name;

            // logic to get content based on the text


            var postData = {
                'to': sender
            };
            postData.text = {};
            postData.text.body='Hello welcome to turn the bus :)';

            PhoneUserModel.findOne({phoneNo: sender}).then((phoneUser) =>{
            
                var message = new Message({
                    text: phonetext,
                    user: phoneUser

                });
                message.save(function (err) {
                    if (err) { return apiResponse.ErrorResponse(res, err); }
                    
                });
            });

            
            var clientServerOptions = {
                uri: process.env.WEBHOOK_URL,
                body: JSON.stringify(postData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer ' + process.env.API_TOKEN
                }
            }
            request(clientServerOptions, function (error, response) {
                if (!error && response.statusCode == 200) {
                    console.log(error,response.body);
                    return apiResponse.successResponse(res, "Successfully send message  to " + sender);                
                } else {
                    return apiResponse.ErrorResponse(res, error);

                }

                
                return;
            });
                 
           
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

