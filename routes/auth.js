const express = require('express');
const debug = require('debug')('app:auth');
const passport = require('passport');
const userschema = require('../models/UserModel');

const auth = express.Router();
auth.route('/signUp')
.get((req, res) => {
    res.render('signup');
})
.post((req, res) => {
    // create user
    const {fullname, username, password} = req.body;

    (async function addUser(){
        try{
            const admin = false;
            const user = {fullname, username, password, admin};
            const results = new userschema(user).save();
            res.render('signin');
        } catch (error) {
            debug(error);
        } finally {
        }
    }());
});

auth.route('/signIn').get((req, res) => {
    res.render('signin');
})
.post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/signIn',
}));


auth.route('/profile').get((req, res) => {
    res.json(req.user);
});


module.exports = auth;