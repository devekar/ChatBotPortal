const passport = require("passport");
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        const dbName = 'login';
        const url = "mongodb+srv://rlnUser:B8GmXJ7kYwh4xfkH@chatbotservice.ahwqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        (async function validateUser(){
            let client = new MongoClient(url);
            try{
                await client.connect();
                const db = client.db(dbName);
                const user = await db.collection('users').findOne({username});

                if(user && user.password === password) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            } finally {
                client.close();
            }
        }());
    }
    ));
};