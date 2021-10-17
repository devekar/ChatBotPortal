const Message = require("../models/MessageModel");
const PhoneUser = require("../models/PhoneUserModel")
const Content = require("../models/ContentModel")
const Rule = require("../models/RuleModel")
const AutoReply = require("../models/AutoReplyModel")

const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
//const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
var request = require('request');

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

            console.log('received message ' + JSON.stringify(msg));

            var sender = msg.contacts[0].wa_id;

            var phonetext = msg.messages[0].text.body;

            var owner = msg.messages[0]._vnd.v1.author.name;

            // logic to get content based on the text


            var postData = {
                'to': sender
            };
            postData.text = {};
            postData.text.body='Hello welcome to turn the bus :)';

            
            PhoneUser.findOne({phoneNo: sender}).then((phoneUser) =>{

                if (!phoneUser){
                    phoneUser = new PhoneUser({
                        "name": owner,
                        "phoneNo": sender,
                        "status": "opt-out"
                    })
                    phoneUser.save(function (err){
                        if (!err){
                            console.log('failed to save user with PhoneNo ' + sender);

                        }
                       
                    });
                }

                if ( phoneUser.status == "opt-in"){

                    var message = new Message({
                        text: phonetext,
                        user: phoneUser
    
                    });
                    message.save(function (err) {
                        if (err) { return apiResponse.ErrorResponse(res, err); }
                        
                    });
                    Rule.findOne({trigger:phonetext}).then((rule) => {
    
    
    
                        if (rule){
                             rule.populate('contents').then((rule1) =>{
                                 console.log(rule1);
                                
                            for (let idx in rule1.contents){
                                postData.text.body = rule1.contents[idx].text;
        
                                let reply = new AutoReply({
                                    text: postData.text.body,
                                    user: phoneUser
        
                                });
                                reply.save(function(err){
                                    if (err) {
                                        console.log('failed to save auto reply');
                                    }
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
        
                            }
        
                        });
                            
                        } else {
                            Rule.findOne({trigger:"catchall"}).then((rule) => {
        
                                if (rule){
                                    rule.populate('contents').then((rule1) =>{
                                        console.log(rule1);
                                       
                                   for (let idx in rule1.contents){
                                       postData.text.body = rule1.contents[idx].text;
        
        
                                        let reply = new AutoReply({
                                            text: postData.text.body,
                                            user: phoneUser
            
                                        });
                                        reply.save(function(err){
                                            if (err) {
                                                console.log('failed to save auto reply');
                                            }
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
               
                                   }
               
                               });
                              }
        
                            });
                        }
                    });



                } else {
                    return apiResponse.successResponse(res, 'message not sent user ' + sender + ' opted not to send messages');
                }
            
                
    
            });
            
            
           
                 
           
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

