const passport = require("passport");
const { Strategy } = require('passport-local');
const mongoose = require('mongoose');
const debug = require('debug');
const userModel = require('../../../models/UserModel');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        (async function validateUser(){
            try{
                console.log('validating user');
                userModel.findOne({username: username}, (error,user) => {
                    if(error){
                        debug(error);
                    } else {
                        if(user && user.password === password) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    }
                });                
            } catch (error) {
                done(error, false);
            } finally {
            }
        }());
    }
    ));
};