const mongoose = require("mongoose");
const debug = require('debug');

var db;
module.exports = {

    connectToServer: function(url, dbName, callback) {
        mongoose.connect(url, { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            //don't show the log when it is test
            if(process.env.NODE_ENV !== "test") {
                console.log("Connected to %s", url);
                console.log("App is running ... \n");
                console.log("Press CTRL + C to stop the process. \n");
            }
            db = mongoose.connection
                    .on('error', error => {
                        debug(error);
                    })
                    .once('open', () => {
                        console.log("Connection open to %s", url);
                    });
            return callback(false);
        })
        .catch(err => {
            console.error("App starting error:", err.message);
            callback(err);
        });
    },

    getDb: function() {
        return db;
    }
}
