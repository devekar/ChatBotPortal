const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');

const auth = express.Router();
auth.route('/signUp').post((req, res) => {
    // create user
    const {fullname, username, password} = req.body;
    const dbName = 'login';
    const url = "mongodb+srv://rlnUser:B8GmXJ7kYwh4xfkH@chatbotservice.ahwqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    (async function addUser(){
        let client;
        try{
            client = await MongoClient.connect(url);
            const admin = false;
            const db = client.db(dbName);
            const user = {fullname, username, password, admin};
            const results = await db.collection('users').insertOne(user);
            debug(results);
            // login and redirect to dashboard
            req.login(results, ()=>{
                res.redirect('/index');
            })
        } catch (error) {
            debug(error);
        } finally {
            client.close();
        }
    }());
});

auth.route('/signIn').get((req, res) => {
    res.render('signin');
})
.post(passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/auth/signIn'
}));


auth.route('/profile').get((req, res) => {
    res.json(req.user);
});


module.exports = auth;