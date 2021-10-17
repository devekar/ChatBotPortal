const Message = require("../models/MessageModel");
const PhoneUser = require("../models/PhoneUserModel")
const Content = require("../models/ContentModel")
const Rule = require("../models/RuleModel")
const AutoReply = require("../models/AutoReplyModel")
const Translator = require("../helpers/translator")

const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
//const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
var request = require('request');
const uuidv4 = require('uuid/v4');

var subscriptionKey = process.env.TRANSLATOR_TEXT_SUBSCRIPTION_KEY;
var endpoint = process.env.TRANSLATOR_TEXT_ENDPOINT;
var region = process.env.TRANSLATOR_TEXT_REGION_AKA_LOCATION;

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

            console.log('received message ' + msg);

            var sender = msg.contacts[0].wa_id;

            var phonetext = msg.messages[0].text.body;

            var owner = msg.messages[0]._vnd.v1.author.name;

            // logic to get content based on the text


            var postData = {
                'to': sender
            };
            postData.text = {};
            postData.text.body='Hello welcome to turn the bus :)';

            let translatorOptions = {
                method: 'POST',
                baseUrl: endpoint,
                url: 'translate',
                qs: {
                  'api-version': '3.0',
                  'to': ['hi', 'ta']
                },
                headers: {
                  'Ocp-Apim-Subscription-Key': subscriptionKey,
                  'Ocp-Apim-Subscription-Region': region,
                  'Content-type': 'application/json',
                  'X-ClientTraceId': uuidv4().toString()
                },
                body: [{
                      'text': "This will be changed with the actual data"
                }],
                json: true,
            };

            PhoneUser.findOne({phoneNo: sender}).then((phoneUser) =>{

                if (!phoneUser){
                    phoneUser = new PhoneUser({
                        "name": owner,
                        "phoneNo": sender,
                        "status": "opt-in"
                    })
                    phoneUser.save(function (err){
                        if (!err){
                            console.log('failed to save user with PhoneNo ' + sender);

                        }
                       
                    });
                }
            
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
                            translatorOptions.body[0].text = rule1.contents[idx].text;
                            request(translatorOptions, function(err, res, body){
                                if(err) {
                                    console.error(`translation request failed. Error is ${err.toString()}`);
                                }
                                console.log(JSON.stringify(body, null, 4));
                                postData.text.body = body.translations[0].text;

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
                            });

    
                        }
    
                    });
                        
                    } else {
                        Rule.findOne({trigger:"catchall"}).then((rule) => {
    
                            if (rule){
                                rule.populate('contents').then((rule1) =>{
                                    console.log(rule1);
                                   
                               for (let idx in rule1.contents){
                                    translatorOptions.body[0].text = rule1.contents[idx].text;
                                    request(translatorOptions, function(err, res, body){
                                        if(err) {
                                            console.error(`translation request failed. Error is ${err.toString()}`);
                                        }
                                        console.log(JSON.stringify(body, null, 4));
                                        postData.text.body = body.translations[0].text;
    
    
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
                                });
           
                               }
           
                           });
                          }
    
                        });
                    }
                });
    
            });
            
            
           
                 
           
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

